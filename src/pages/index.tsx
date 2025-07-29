import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useState, useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { DeviceFrame } from '@/components/DeviceFrame';

// 전체 컨테이너
const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${theme.colors.gray[50]};
  padding: ${theme.spacing.xl};
  gap: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
`;

// 중앙 콘텐츠 영역
const CenterContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${theme.spacing.xl} * 2);
  
  @media (max-width: 768px) {
    min-height: calc(100vh - ${theme.spacing.md} * 2);
  }
`;




// 헤더 영역
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: max(8px, calc(16px * var(--device-scale, 1))) max(12px, calc(24px * var(--device-scale, 1)));
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoIcon = styled.div`
  width: max(16px, calc(32px * var(--device-scale, 1)));
  height: max(16px, calc(32px * var(--device-scale, 1)));
  background-color: ${theme.colors.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-weight: bold;
  font-size: max(12px, calc(18px * var(--device-scale, 1)));
`;

const LogoText = styled.span`
  font-size: max(14px, calc(20px * var(--device-scale, 1)));
  font-weight: 600;
  color: ${theme.colors.black};
`;



// 메인 콘텐츠
const Content = styled.div`
  flex: 1;
  padding: max(12px, calc(24px * var(--device-scale, 1))) max(16px, calc(32px * var(--device-scale, 1)));
  display: flex;
  flex-direction: column;
  min-height: 0; /* flex 오버플로우 방지 */
`;

const MainTitle = styled.h1`
  font-size: max(14px, calc(20px * var(--device-scale, 1)));
  font-weight: 700;
  color: ${theme.colors.black};
  line-height: 1.4;
  margin-bottom: max(6px, calc(12px * var(--device-scale, 1)));
`;


const Subtitle = styled.p`
  font-size: max(10px, calc(13px * var(--device-scale, 1)));
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: max(24px, calc(48px * var(--device-scale, 1)));
`;


// 전화번호 입력창
const PhoneDisplay = styled.div`
  text-align: center;
  font-size: max(20px, calc(32px * var(--device-scale, 1)));
  font-weight: 400;
  letter-spacing: max(1px, calc(2px * var(--device-scale, 1)));
  color: ${theme.colors.black};
  margin-bottom: max(32px, calc(64px * var(--device-scale, 1)));
  padding: max(12px, calc(24px * var(--device-scale, 1))) 0;
  min-height: max(32px, calc(48px * var(--device-scale, 1)));
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 숫자 키패드
const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: max(16px, calc(32px * var(--device-scale, 1)));
  margin-bottom: max(24px, calc(48px * var(--device-scale, 1)));
  padding: 0 max(24px, calc(48px * var(--device-scale, 1)));
  flex: 1;
  align-content: center;
  justify-items: center;
`;

const KeypadButton = styled.button<{ isSpecial?: boolean }>`
  width: max(50px, calc(90px * var(--device-scale, 1)));
  height: max(50px, calc(90px * var(--device-scale, 1)));
  border: none;
  border-radius: 50%;
  background-color: ${props => props.isSpecial ? 'transparent' : 'transparent'};
  font-size: max(24px, calc(40px * var(--device-scale, 1)));
  font-weight: 300;
  color: ${theme.colors.black};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  justify-self: center;
  
  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray[100]};
    transform: scale(1.05);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
    background-color: ${theme.colors.gray[200]};
  }
  
  &:disabled {
    cursor: default;
    opacity: 0;
  }
`;

// 우측 안내 패널
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



// 타이핑 애니메이션 컴포넌트
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
        // 마지막 아이템이므로 모든 타이핑 완료
        setTimeout(() => setIsAllComplete(true), 500);
      }
    }
  }, [isComplete, currentIndex, items.length, displayedText]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기화
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

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('010');

  // 패널 콘텐츠 데이터
  const panelSections = {
    title: '',
    sections: [
      {
        title: '현재 화면',
        items: [
          '전화번호 입력 화면',
          '알고케어 서비스 시작점', 
          '010 번호 입력 필요'
        ]
      },
      {
        title: '사용 방법',
        items: [
          '숫자 키패드로 전화번호 입력',
          '⌫ 버튼으로 삭제 가능',
          '최대 11자리까지 입력',
          '11자리 입력 완료시 자동 진행'
        ]
      },
      {
        title: '주요 기능', 
        items: [
          '전화번호 마스킹 처리',
          '커스텀 숫자 키패드',
          '실시간 입력 포맷팅',
          '자동 화면 전환 기능'
        ]
      },
      {
        title: '다음 단계',
        items: [
          '컨디션 선택 화면으로 이동',
          '개인 맞춤 영양제 추천',
          '체험용 데모 플로우 진행'
        ]
      }
    ]
  };

  // 모든 항목을 하나의 배열로 합치기 (섹션 제목 포함)
  const allTextItems = panelSections.sections.reduce((acc, section) => {
    acc.push(`[${section.title}]`); // 섹션 제목
    section.items.forEach(item => acc.push(`• ${item}`)); // 각 항목
    return acc;
  }, [] as string[]);

  const typingEffect = useSequentialTyping(allTextItems, 25);
  
  const formatPhoneDisplay = (number: string) => {
    if (number.length <= 3) {
      return number + '-****-****';
    }
    if (number.length <= 7) {
      const part1 = number.slice(0, 3);
      const part2 = number.slice(3);
      return `${part1}-${part2}${'*'.repeat(4 - part2.length)}-****`;
    }
    if (number.length <= 11) {
      const part1 = number.slice(0, 3);
      const part2 = number.slice(3, 7);
      const part3 = number.slice(7);
      return `${part1}-${part2}-${part3}${'*'.repeat(4 - part3.length)}`;
    }
    return number;
  };
  
  const handleKeypadPress = (value: string) => {
    if (value === 'delete') {
      if (phoneNumber.length > 3) {
        setPhoneNumber(phoneNumber.slice(0, -1));
      }
    } else if (phoneNumber.length < 11) {
      const newPhoneNumber = phoneNumber + value;
      setPhoneNumber(newPhoneNumber);
      
      // 11자리가 완성되면 자동으로 다음 페이지로 이동
      if (newPhoneNumber.length === 11) {
        setTimeout(() => {
          // 강제 새로고침과 함께 페이지 전환
          window.location.href = '/condition';
        }, 300); // 300ms 딜레이 후 이동
      }
    }
  };
  
  
  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'], 
    ['7', '8', '9'],
    ['', '0', 'delete']
  ];
  
  return (
    <MainContainer>
      <CenterContent>
        <DeviceFrame>
          {/* 상단 상태바 */}
          <StatusBar />
        
        {/* 헤더 */}
        <Header>
          <Logo>
            <LogoIcon>C</LogoIcon>
            <LogoText>algocare</LogoText>
          </Logo>
        </Header>
        
        {/* 메인 콘텐츠 */}
        <Content>
          <MainTitle>
            알고케어 아연미네랄8에는<br />
            유럽산 <strong>LALLEMAND</strong> 미네랄을 사용해요
          </MainTitle>
          
          <Subtitle>
            100년 전통의 효모 전문 글로벌 기업인 Lallemand의 크롬과 몰리브덴을 담았어요.
          </Subtitle>
          
          
          <div style={{ textAlign: 'center', marginBottom: 'clamp(16px, 4vw, 24px)' }}>
            <div style={{ 
              fontSize: 'clamp(12px, 2.5vw, 14px)', 
              color: theme.colors.gray[600], 
              marginBottom: 'clamp(8px, 2vw, 12px)' 
            }}>
              전화번호 찾기
            </div>
          </div>
          
          <PhoneDisplay>
            {formatPhoneDisplay(phoneNumber)}
          </PhoneDisplay>
          
          <Keypad>
            {keypadNumbers.flat().map((num, index) => (
              <KeypadButton
                key={index}
                isSpecial={num === '' || num === 'delete'}
                onClick={() => num && handleKeypadPress(num)}
                disabled={num === ''}
              >
                {num === 'delete' ? '⌫' : num}
              </KeypadButton>
            ))}
          </Keypad>
          
        </Content>
        </DeviceFrame>
      </CenterContent>
      
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