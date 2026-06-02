import { Statistic, Flex } from 'antd';
import { ClockCircleOutlined, HourglassOutlined } from '@ant-design/icons';

interface LifeGridProps {
  birthday: string;
  lifespan: number | null;
}

function getMonthsLived(birthday: string): number {
  const birth = new Date(birthday);
  const now = new Date();
  const yearDiff = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  return yearDiff * 12 + monthDiff;
}

export default function LifeGrid({ birthday, lifespan }: LifeGridProps) {
  const effectiveLifespan = lifespan ?? 97;
  const totalMonths = effectiveLifespan * 12;
  const monthsLived = Math.min(getMonthsLived(birthday), totalMonths);

  // Build year groups: each group has 12 cells (one year)
  const years: { cells: { monthIndex: number; lived: boolean; current: boolean }[] }[] = [];

  for (let y = 0; y < effectiveLifespan; y++) {
    const cells = [];
    for (let m = 0; m < 12; m++) {
      const monthIndex = y * 12 + m;
      if (monthIndex < totalMonths) {
        cells.push({
          monthIndex,
          lived: monthIndex < monthsLived,
          current: monthIndex === monthsLived - 1,
        });
      }
    }
    years.push({ cells });
  }

  const stats = {
    lived: monthsLived,
    remaining: totalMonths - monthsLived,
    percent: Math.round((monthsLived / totalMonths) * 100),
  };

  return (
    <>
      <Flex justify="center" gap={16} wrap style={{ marginBottom: 16 }}>
        <div style={{ background: 'rgba(97, 97, 97, 0.12)', borderRadius: 20, padding: '6px 14px' }}>
          <Statistic
            prefix={<ClockCircleOutlined />}
            value={stats.lived}
            suffix={`个月 (${stats.percent}%)`}
            styles={{ content: { color: '#616161', fontSize: '0.95rem' } }}
          />
        </div>
        <div style={{ background: 'rgba(102, 187, 106, 0.12)', borderRadius: 20, padding: '6px 14px' }}>
          <Statistic
            prefix={<HourglassOutlined />}
            value={stats.remaining}
            suffix="个月"
            styles={{ content: { color: '#388e3c', fontSize: '0.95rem' } }}
          />
        </div>
      </Flex>

      <div className="life-grid">
        {years.map((year, y) => (
          <div key={y} className="year-group">
            {year.cells.map((cell) => (
              <div
                key={cell.monthIndex}
                className={`grid-cell ${cell.lived ? 'cell-lived' : 'cell-remaining'} ${cell.current ? 'cell-current' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}