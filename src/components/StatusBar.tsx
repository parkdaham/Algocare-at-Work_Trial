import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

// DeviceFrame 기준 비례 스케일링 (600px 기준 48px 높이)
const StatusBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* DeviceFrame 크기에 비례하여 스케일링 */
  height: calc(48px * var(--device-scale, 1));
  padding: 0 calc(20px * var(--device-scale, 1));
  background-color: #F9F9F9;
  font-size: calc(16px * var(--device-scale, 1));
  font-weight: 600;
  color: ${theme.colors.black};
`;

const StatusTime = styled.div`
  flex: 1;
  text-align: center;
`;

const StatusIcons = styled.div`
  display: flex;
  gap: calc(6px * var(--device-scale, 1));
  align-items: center;
  font-size: calc(18px * var(--device-scale, 1));
`;

interface StatusBarProps {
  showIcons?: boolean;
  time?: string;
}

export const StatusBar = ({ 
  showIcons = false, 
  time = '오후 12:00' 
}: StatusBarProps) => {
  return (
    <StatusBarContainer>
      <div></div>
      <StatusTime>{time}</StatusTime>
      <StatusIcons>
        {showIcons && (
          <>
            <span>❄️</span>
            <span>📶</span>
          </>
        )}
      </StatusIcons>
    </StatusBarContainer>
  );
};