import { useState } from 'react';
import { Typography, Card, Flex } from 'antd';
import LifeInput from './components/LifeInput';
import LifeGrid from './components/LifeGrid';
import './App.css';

const { Title, Paragraph, Text } = Typography;

function App() {
  const [birthday, setBirthday] = useState('');
  const [lifespan, setLifespan] = useState<number | null>(97);

  return (
    <Flex vertical gap={24} style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
        <Title level={2} style={{ color: '#3d2e1a', letterSpacing: 2, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span className="title-deco">✦</span>
          生命方格阵
          <span className="title-deco">✦</span>
        </Title>
        <Paragraph style={{ color: '#5d4e37', marginTop: 4 }}>
          每一个小方格，代表你生命中的一个月
        </Paragraph>
      </div>

      <Card className="life-card">
        <LifeInput
          birthday={birthday}
          lifespan={lifespan}
          onBirthdayChange={setBirthday}
          onLifespanChange={setLifespan}
        />
      </Card>

      {birthday && (
        <Card className="life-card">
          <LifeGrid birthday={birthday} lifespan={lifespan} />
        </Card>
      )}

      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <Text type="secondary">珍惜每一天，让每一个方格都闪闪发光 ✨</Text>
      </div>
    </Flex>
  );
}

export default App;