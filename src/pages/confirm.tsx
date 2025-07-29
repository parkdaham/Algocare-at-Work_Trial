import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useState, useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { DeviceFrame } from '@/components/DeviceFrame';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
  padding: ${theme.spacing.xl};
  gap: ${theme.spacing.xl};
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;




// 로딩 화면 스타일
const LoadingContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: max(20px, calc(40px * var(--device-scale, 1))) max(12px, calc(24px * var(--device-scale, 1)));
  text-align: center;
  min-height: 0;
`;

const LoadingAnimation = styled.div`
  width: max(60px, calc(120px * var(--device-scale, 1)));
  height: max(60px, calc(120px * var(--device-scale, 1)));
  margin-bottom: max(16px, calc(32px * var(--device-scale, 1)));
  position: relative;
`;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  border: 6px solid ${theme.colors.gray[200]};
  border-top: 6px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingTitle = styled.h1`
  font-size: max(16px, calc(24px * var(--device-scale, 1)));
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: max(6px, calc(12px * var(--device-scale, 1)));
`;

const LoadingSubtitle = styled.p`
  font-size: max(11px, calc(16px * var(--device-scale, 1)));
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
  margin: 0;
`;

// 하단 프로그레스바
const ProgressContainer = styled.div`
  padding: max(12px, calc(20px * var(--device-scale, 1))) max(12px, calc(24px * var(--device-scale, 1)));
  background-color: ${theme.colors.white};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${theme.colors.gray[200]};
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  border-radius: 2px;
  transition: width 0.1s ease-out;
`;

// 완료 화면 스타일
const CompletionContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: max(20px, calc(40px * var(--device-scale, 1))) max(12px, calc(24px * var(--device-scale, 1)));
  text-align: center;
  min-height: 0;
`;

const CompletionIcon = styled.div`
  width: max(50px, calc(100px * var(--device-scale, 1)));
  height: max(50px, calc(100px * var(--device-scale, 1)));
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: max(24px, calc(48px * var(--device-scale, 1)));
  margin-bottom: max(12px, calc(24px * var(--device-scale, 1)));
  animation: bounceIn 0.8s ease-out;
  
  @keyframes bounceIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    60% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CompletionTitle = styled.h1`
  font-size: max(16px, calc(24px * var(--device-scale, 1)));
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: max(6px, calc(12px * var(--device-scale, 1)));
`;

const CompletionSubtitle = styled.p`
  font-size: max(11px, calc(16px * var(--device-scale, 1)));
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: max(16px, calc(32px * var(--device-scale, 1)));
`;

const CompletionActions = styled.div`
  width: 100%;
  padding: 0 max(12px, calc(24px * var(--device-scale, 1))) max(12px, calc(24px * var(--device-scale, 1)));
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: max(8px, calc(16px * var(--device-scale, 1)));
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: ${theme.colors.white};
  border: none;
  border-radius: max(6px, calc(12px * var(--device-scale, 1)));
  font-size: max(12px, calc(16px * var(--device-scale, 1)));
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: max(6px, calc(12px * var(--device-scale, 1)));
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// 우측 안내 패널 스타일들
const InfoPanel = styled.aside`
  min-width: 280px;
  width: 320px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  height: fit-content;
  position: sticky;
  top: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const InfoTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 600;
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: ${theme.spacing.sm};
`;

const InfoSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const InfoSectionTitle = styled.h3`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`;

const InfoItem = styled.li`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm};
  padding-left: ${theme.spacing.md};
  position: relative;
  line-height: 1.5;
  
  &:before {
    content: '•';
    color: ${theme.colors.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const TypingText = styled.span<{ isComplete: boolean }>`
  &::after {
    content: '${props => props.isComplete ? '' : '|'}';
    opacity: ${props => props.isComplete ? 0 : 1};
    animation: ${props => props.isComplete ? 'none' : 'blink 1s infinite'};
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

// 타이핑 효과 훅
const useTypingEffect = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsComplete(false);
    
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};

// 순차적 타이핑 효과 훅
const useSequentialTyping = (items: string[], speed: number = 30) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [isAllComplete, setIsAllComplete] = useState(false);

  const currentText = items[currentIndex] || '';
  const { displayedText, isComplete } = useTypingEffect(currentText, speed, currentIndex * 500);

  useEffect(() => {
    if (isComplete && currentIndex < items.length) {
      setCompletedItems(prev => [...prev, displayedText]);
      if (currentIndex < items.length - 1) {
        setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
      } else {
        setTimeout(() => setIsAllComplete(true), 500);
      }
    }
  }, [isComplete, currentIndex, items.length, displayedText]);

  useEffect(() => {
    setCurrentIndex(0);
    setCompletedItems([]);
    setIsAllComplete(false);
  }, [items]);

  return { 
    completedItems, 
    currentText: displayedText, 
    isTyping: currentIndex < items.length && !isAllComplete,
    isAllComplete,
    showCursor: !isAllComplete
  };
};

export default function Confirm() {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // 패널 콘텐츠 데이터
  const panelSections = {
    title: '맞춤 조합 생성 가이드',
    sections: [
      {
        title: '현재 단계',
        items: [
          '선택된 몸상태 분석 중',
          'AI 기반 영양소 매칭',
          '개인 맞춤형 조합 생성'
        ]
      },
      {
        title: '생성 과정',
        items: [
          '몸상태 데이터 분석',
          '영양소 상호작용 검토',
          '최적 조합 알고리즘 적용',
          '개인화 추천 완성'
        ]
      },
      {
        title: '완료 후',
        items: [
          '12가지 맞춤 영양소 확인',
          '섭취 방법 안내',
          '주의사항 및 효과 설명'
        ]
      }
    ]
  };

  // 모든 항목을 하나의 배열로 합치기
  const allTextItems = panelSections.sections.reduce((acc, section) => {
    acc.push(`[${section.title}]`);
    section.items.forEach(item => acc.push(`• ${item}`));
    return acc;
  }, [] as string[]);

  const typingEffect = useSequentialTyping(allTextItems, 25);

  useEffect(() => {
    // 프로그레스바 애니메이션 (5초 동안)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // 50ms * 2 = 5초
      });
    }, 100);

    // 5초 후 완료 화면으로 전환
    const completionTimer = setTimeout(() => {
      setIsComplete(true);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
    };
  }, []);

  return (
    <MainContainer>
      <DeviceFrame>
        {/* 상단 상태바 */}
        <StatusBar showIcons={true} />
          
          {!isComplete ? (
          // 로딩 화면
          <>
            <LoadingContent>
              <LoadingAnimation>
                <LoadingSpinner />
              </LoadingAnimation>
              <LoadingTitle>맞춤 조합 생성 중</LoadingTitle>
              <LoadingSubtitle>
                AI가 고객님의 몸상태를 분석하여<br />
                최적의 영양소 조합을 만들고 있습니다
              </LoadingSubtitle>
            </LoadingContent>
            
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill progress={progress} />
              </ProgressBar>
            </ProgressContainer>
          </>
        ) : (
          // 완료 화면
          <>
            <CompletionContent>
              <CompletionIcon>✨</CompletionIcon>
              <CompletionTitle>조합 생성 완료!</CompletionTitle>
              <CompletionSubtitle>
                고객님께 맞는 12가지 영양소 조합을<br />
                성공적으로 생성했습니다
              </CompletionSubtitle>
            </CompletionContent>
            
            <CompletionActions>
              <PrimaryButton onClick={() => window.location.href = '/'}>
                다시 시작하기
              </PrimaryButton>
            </CompletionActions>
          </>
        )}
      </DeviceFrame>
      
      <InfoPanel>
        <InfoTitle>{panelSections.title}</InfoTitle>
        
        <InfoSection>
          <div style={{ minHeight: '400px', lineHeight: '1.8' }}>
            {typingEffect.completedItems.map((item, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                {item.startsWith('[') && item.endsWith(']') ? (
                  <InfoSectionTitle style={{ marginTop: index === 0 ? '0' : '20px', marginBottom: '12px' }}>
                    {item.slice(1, -1)}
                  </InfoSectionTitle>
                ) : (
                  <InfoItem style={{ 
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.gray[600],
                    marginLeft: '16px' 
                  }}>
                    {item.replace('• ', '')}
                  </InfoItem>
                )}
              </div>
            ))}
            
            {typingEffect.isTyping && !typingEffect.isAllComplete && (
              <div style={{ marginBottom: '8px' }}>
                {typingEffect.currentText.startsWith('[') && typingEffect.currentText.includes(']') ? (
                  <InfoSectionTitle style={{ 
                    marginTop: typingEffect.completedItems.length === 0 ? '0' : '20px', 
                    marginBottom: '12px' 
                  }}>
                    <TypingText isComplete={typingEffect.isAllComplete}>
                      {typingEffect.currentText.slice(1).replace(']', '')}
                    </TypingText>
                  </InfoSectionTitle>
                ) : (
                  <InfoItem style={{ 
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.gray[600],
                    marginLeft: '16px' 
                  }}>
                    <TypingText isComplete={typingEffect.isAllComplete}>
                      {typingEffect.currentText.replace('• ', '')}
                    </TypingText>
                  </InfoItem>
                )}
              </div>
            )}
          </div>
        </InfoSection>
      </InfoPanel>
    </MainContainer>
  );
}