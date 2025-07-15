import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./DashboardPage.module.css"
import { formatDate, formatTotalSeconds } from '../utils/date';

interface User {
  id: string;
  name: string;
  code: string;
}
interface Shift {
  id: string;
  startTime: string;
  endTime: string | null;
}
interface DailySummary {
  totalSecondsToday: number;
  activeShift: Shift | null;
}
interface HistoryEntry {
  date: string;
  totalSeconds: number;
}

export function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
const [displaySeconds, setDisplaySeconds] = useState(0); 
  const navigate = useNavigate();

  const fetchDashboardData = async (userId: string) => {
    try {
      const [summaryResponse, historyResponse] = await Promise.all([
        axios.get(`http://localhost:3001/summary/today/${userId}`),
        axios.get(`http://localhost:3001/summary/history/${userId}`)
      ]);
      setSummary(summaryResponse.data);
      setHistory(historyResponse.data);
    } catch (error) {
      console.error("Falha ao buscar dados do dashboard:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchDashboardData(parsedUser.id);
    } else {
      navigate('/');
    }
  }, [navigate]);

    useEffect(() => {
    if (!summary) return;

    let intervalId: number | undefined;

    if (summary.activeShift) {
      intervalId = setInterval(() => {
        const startTime = new Date(summary.activeShift!.startTime).getTime();
        const now = new Date().getTime();
        const activeDurationSeconds = Math.floor((now - startTime) / 1000);

        setDisplaySeconds(summary.totalSecondsToday + activeDurationSeconds);
      }, 1000);
    } else {
      setDisplaySeconds(summary.totalSecondsToday);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [summary]); 

  const handleStartShift = async () => {
    if (!user) return;
    await axios.post('http://localhost:3001/shifts/start', { userId: user.id });
    fetchDashboardData(user.id);
  };
  
  const handleEndShift = async () => {
    if (!user) return;
    await axios.patch('http://localhost:3001/shifts/end', { userId: user.id });
    fetchDashboardData(user.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user || !summary) {
    return <div>Carregando...</div>;
  }
  
return (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <h2>{user.name}</h2> 
        <span className={styles.userCode}>{user.code}</span>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </header>
    
    <main>
      <section className={styles.clockSection}>
        <div className={styles.timeDisplayWrapper}>
          <p className={styles.timeLabel}>Horas de hoje</p>
          <p className={styles.timeDisplay}>
            {formatTotalSeconds(displaySeconds)}
          </p>
        </div>
        <button onClick={summary.activeShift ? handleEndShift : handleStartShift} className={styles.shiftButton}>
          {summary.activeShift ? 'Hora de saída' : 'Hora de entrada'}
        </button>
      </section>

      <section className={styles.historySection}>
        <h3>Dias anteriores</h3>
        {history.length > 0 ? (
          <ul className={styles.historyList}>
            {history.map((entry) => (
              <li key={entry.date} className={styles.historyItem}>
                <span className={styles.historyDate}>{formatDate(entry.date)}</span>
                <span className={styles.historyTime}>{formatTotalSeconds(entry.totalSeconds)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum histórico para exibir.</p>
        )}
      </section>
    </main>
  </div>
);
}