import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { ReactNode, useEffect, useRef, useState } from 'react';

// 디바이스 프레임 컨테이너
const DeviceFrameContainer = styled.div`
  /* 프레임 크기: 37.5rem x 60rem (1:1.6 비율) */
  width: min(37.5rem, 53.125vh, 90vw);
  height: calc(min(37.5rem, 53.125vh, 90vw) * 1.6);
  min-width: 390px;
  min-height: 624px;
  max-width: 37.5rem;
  max-height: calc(37.5rem * 1.6);
  background-color: #F9F9F9;
  border-radius: 1rem;
  box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.1), 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  /* 기본 스케일 변수 초기화 */
  --device-scale: 1;
  --base-font-size: 1rem;
  
  @media (max-width: 768px) {
    width: 90vw;
    height: calc(90vw * 1.6);
    max-width: 25rem;
    max-height: calc(25rem * 1.6);
  }
  
  @media (max-width: 480px) {
    width: 95vw;
    height: calc(95vw * 1.6);
    max-width: 20rem;
    max-height: calc(20rem * 1.6);
  }
`;

interface DeviceFrameProps {
  children: ReactNode;
}

export const DeviceFrame = ({ children }: DeviceFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateScale = () => {
      if (frameRef.current) {
        const frameWidth = frameRef.current.offsetWidth;
        // 37.5rem (600px)을 기준으로 스케일 계산
        const baseWidth = 37.5 * 16; // 37.5rem = 600px
        const scale = frameWidth / baseWidth;
        
        // 최소/최대 스케일 제한 (가독성과 사용성 확보)
        const clampedScale = Math.max(0.5, Math.min(1.5, scale));
        
        frameRef.current.style.setProperty('--device-scale', clampedScale.toString());
        frameRef.current.style.setProperty('--base-font-size', `${16 * clampedScale}px`);
      }
    };

    // 초기 스케일 설정 (setTimeout으로 DOM 준비 대기)
    const initialTimer = setTimeout(updateScale, 100);
    
    // ResizeObserver 지원 확인 및 설정
    let resizeObserver: ResizeObserver | null = null;
    
    if ('ResizeObserver' in window && frameRef.current) {
      try {
        resizeObserver = new ResizeObserver(updateScale);
        resizeObserver.observe(frameRef.current);
      } catch (error) {
        console.warn('ResizeObserver not supported, falling back to window resize');
        // ResizeObserver가 지원되지 않는 경우 window resize 이벤트 사용
        window.addEventListener('resize', updateScale);
      }
    } else {
      // ResizeObserver 미지원 환경에서는 window resize 사용
      window.addEventListener('resize', updateScale);
    }

    return () => {
      clearTimeout(initialTimer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updateScale);
      }
    };
  }, [isClient]);

  return (
    <DeviceFrameContainer ref={frameRef}>
      {children}
    </DeviceFrameContainer>
  );
};