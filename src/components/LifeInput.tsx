import dayjs from 'dayjs';
import { DatePicker, InputNumber, Flex } from 'antd';
import { SmileOutlined, StarOutlined } from '@ant-design/icons';

interface LifeInputProps {
  birthday: string;
  lifespan: number | null;
  onBirthdayChange: (value: string) => void;
  onLifespanChange: (value: number | null) => void;
}

export default function LifeInput({
  birthday,
  lifespan,
  onBirthdayChange,
  onLifespanChange,
}: LifeInputProps) {
  return (
    <Flex justify="center" wrap gap={24}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
        <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#3d2e1a', display: 'flex', alignItems: 'center', gap: 4 }}>
          <SmileOutlined /> 你的生日
        </label>
        <DatePicker
          value={birthday ? dayjs(birthday) : undefined}
          onChange={(date) => onBirthdayChange(date ? date.format('YYYY-MM-DD') : '')}
          disabledDate={(current) => current && current > dayjs()}
          format="YYYY年MM月DD日"
          placeholder="选择你的生日"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
        <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#3d2e1a', display: 'flex', alignItems: 'center', gap: 4 }}>
          <StarOutlined /> 预计存活年龄
        </label>
        <InputNumber
          value={lifespan}
          onChange={(val) => onLifespanChange(val)}
          min={1}
          max={150}
          suffix="岁"
          style={{ width: '100%' }}
        />
      </div>
    </Flex>
  );
}