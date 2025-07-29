import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { ReactNode, useEffect, useRef } from 'react';

// 디바이스 프레임 컨테이너
const DeviceFrameContainer = styled.div`
  /* 비율 유지: 600:960 = 5:8 */
  width: min(600px, 53.125vh, 90vw);
  height: calc(min(600px, 53.125vh, 90vw) * 1.6);
  max-width: 600px;
  max-height: 960px;
  background-color: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  /* 기본 스케일 변수 초기화 */
  --device-scale: 1;
  --base-font-size: 16px;
  
  @media (max-width: 768px) {
    width: 90vw;
    height: calc(90vw * 1.6);
    max-width: 400px;
    max-height: 640px;
  }
  
  @media (max-width: 480px) {
    width: 95vw;
    height: calc(95vw * 1.6);
    max-width: 320px;
    max-height: 512px;
  }
`;

interface DeviceFrameProps {
  children: ReactNode;
}

export const DeviceFrame = ({ children }: DeviceFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (frameRef.current) {
        const frameWidth = frameRef.current.offsetWidth;
        // 600px을 기준으로 스케일 계산
        const scale = frameWidth / 600;
        
        // 최소/최대 스케일 제한 (가독성과 사용성 확보)
        const clampedScale = Math.max(0.5, Math.min(1, scale));
        
        frameRef.current.style.setProperty('--device-scale', clampedScale.toString());
        frameRef.current.style.setProperty('--base-font-size', `${16 * clampedScale}px`);
      }
    };

    // 초기 스케일 설정
    updateScale();
    
    // 윈도우 리사이즈 시 스케일 업데이트
    const resizeObserver = new ResizeObserver(updateScale);
    if (frameRef.current) {
      resizeObserver.observe(frameRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <DeviceFrameContainer ref={frameRef}>
      {children}
    </DeviceFrameContainer>
  );
};