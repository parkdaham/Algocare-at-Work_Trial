import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { useState, useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { DeviceFrame } from '@/components/DeviceFrame';

// 타이핑 효과 훅 (index.tsx에서 가져옴)
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

// 스타일 컴포넌트들 (index.tsx에서 가져옴)
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




const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${theme.colors.gray[600]};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${theme.colors.black};
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: ${theme.colors.white};
  z-index: 50;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; // 하단 버튼 영역 공간 확보
`;

// 탭 메뉴
const TabContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.gray[100]};
  border-radius: 8px;
  margin: 16px 24px;
  padding: 4px;
  position: relative;
  z-index: 15;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border: none;
  background-color: ${props => props.isActive ? theme.colors.white : 'transparent'};
  color: ${props => props.isActive ? theme.colors.black : theme.colors.gray[600]};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  z-index: 20;
  pointer-events: auto;
  
  &:hover {
    background-color: ${props => props.isActive ? theme.colors.white : theme.colors.gray[200]};
  }
`;

const SectionContainer = styled.div`
  padding: 8px 24px 20px 24px;
  flex: 1;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: 16px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const CompactCard = styled.div<{ isSelected: boolean }>`
  position: relative;
  aspect-ratio: 1;
  background-color: ${props => props.isSelected ? theme.colors.primary : theme.colors.gray[50]};
  border: 2px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.gray[200]};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${theme.colors.primary};
    background-color: ${props => props.isSelected ? theme.colors.primary : theme.colors.gray[100]};
  }
`;

const CardIcon = styled.div<{ isSelected: boolean }>`
  font-size: 20px;
  margin-bottom: 4px;
  filter: ${props => props.isSelected ? 'brightness(0) invert(1)' : 'none'};
`;

const CardLabel = styled.span<{ isSelected: boolean }>`
  font-size: 11px;
  font-weight: 500;
  color: ${props => props.isSelected ? theme.colors.white : theme.colors.gray[700]};
  text-align: center;
  line-height: 1.2;
`;

const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BottomSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  border-top: 1px solid ${theme.colors.gray[100]};
  background-color: ${theme.colors.white};
  z-index: 5;
`;

const BottomText = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[600]};
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.4;
`;

const CTAButton = styled.button<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? theme.colors.gray[300] : theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray[700]};
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
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

// 바텀시트 관련 스타일 컴포넌트들
const BottomSheetOverlay = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
  border-radius: 16px;
`;

const BottomSheetContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: 24px 24px 16px 16px;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
  z-index: 101;
  transform: translateY(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  max-height: 70%;
  overflow-y: auto;
`;

const BottomSheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${theme.colors.gray[300]};
  border-radius: 2px;
  margin: 12px auto 20px;
  cursor: pointer;
`;

const BottomSheetHeader = styled.div`
  text-align: center;
  padding: 0 24px 20px;
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

const BottomSheetTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: 8px;
`;

const BottomSheetSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[600]};
  margin: 0;
`;

const BottomSheetContent = styled.div`
  padding: 24px;
`;

const ResultSection = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const ResultText = styled.p`
  font-size: 14px;
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: 24px;
`;

const BottomSheetButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${theme.colors.gray[700]};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export default function ConditionPage() {
  
  // 탭 메뉴
  const tabs = ['커스텀', '심장', '중성', '기본', '여성'];
  
  // 각 카드의 선택 상태 관리
  const [cardSelections, setCardSelections] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState('커스텀');
  
  // 바텀시트 상태 관리
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 탭 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = (tabName: string) => {
    const element = document.getElementById(`section-${tabName}`);
    const contentElement = document.querySelector('[data-content-container]');
    const headerElement = document.querySelector('[data-header-container]');
    
    if (element && contentElement && headerElement) {
      const headerHeight = headerElement.getBoundingClientRect().height;
      const elementTop = element.offsetTop;
      const scrollTop = elementTop - headerHeight - 16; // 16px 여백 추가
      
      contentElement.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  };

  // 스크롤 위치에 따른 활성 탭 감지
  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.querySelector('[data-content-container]');
      const headerElement = document.querySelector('[data-header-container]');
      if (!contentElement || !headerElement) return;

      const sections = tabs.map(tab => ({
        name: tab,
        element: document.getElementById(`section-${tab}`)
      })).filter(section => section.element);

      const headerHeight = headerElement.getBoundingClientRect().height;
      const scrollPosition = contentElement.scrollTop + headerHeight + 50; // 헤더 높이 + 여백

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (offsetTop <= scrollPosition) {
            setActiveTab(section.name);
            break;
          }
        }
      }
    };

    const contentElement = document.querySelector('[data-content-container]');
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [tabs]);

  // 바텀시트 닫기
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 바텀시트 열기 (CTA 버튼 클릭 시)
  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // 컨디션 카드 데이터 (탭별로 분류)
  const conditionsByTab = {
    '커스텀': [
      { id: 'custom1', title: '개인맞춤', icon: '⚙️' },
      { id: 'custom2', title: '프리미엄', icon: '⭐' },
      { id: 'custom3', title: '전문가', icon: '👨‍⚕️' },
      { id: 'custom4', title: '특별케어', icon: '💎' }
    ],
    '심장': [
      { id: 'energy', title: '운동', icon: '🏃' },
      { id: 'immunity', title: '음주', icon: '🍷' },
      { id: 'stress', title: '야근', icon: '💻' },
      { id: 'sleep', title: '스트레스', icon: '😓' },
      { id: 'digestion', title: '식사거를', icon: '🍽️' },
      { id: 'beauty', title: '피로', icon: '😴' },
      { id: 'muscle', title: '수면부족', icon: '🌙' },
      { id: 'bone', title: '숙식킥', icon: '🥤' },
      { id: 'eye1', title: '눈피로', icon: '👁️' },
      { id: 'eye2', title: '눈건조', icon: '👁️' },
      { id: 'joint', title: '근육경직', icon: '💪' },
      { id: 'circulation', title: '근육통', icon: '💊' }
    ],
    '중성': [
      { id: 'fatigue', title: '피로', icon: '😴' },
      { id: 'aging', title: '어르클', icon: '👴' },
      { id: 'brain', title: '두뇌', icon: '🧠' },
      { id: 'mood', title: '컨디션', icon: '😊' },
      { id: 'circulation2', title: '충혈감기', icon: '💧' },
      { id: 'metabolism', title: '혈감기', icon: '💧' },
      { id: 'coldness', title: '코감기', icon: '🤧' },
      { id: 'immunity2', title: '아토피', icon: '🤒' },
      { id: 'veggie', title: '소화불량', icon: '🥬' },
      { id: 'supplement', title: '속식킥', icon: '🥤' },
      { id: 'recovery', title: '수족냉증', icon: '❄️' },
      { id: 'sleep2', title: '술파지벤', icon: '💊' },
      { id: 'joint2', title: '근육경직', icon: '💪' },
      { id: 'circulation3', title: '근육통', icon: '💊' },
      { id: 'eye3', title: '눈건조', icon: '👁️' },
      { id: 'eye4', title: '눈피로', icon: '👁️' },
      { id: 'hair', title: '번아웃', icon: '🌰' },
      { id: 'bone2', title: '무기력', icon: '🦴' },
      { id: 'joint3', title: '불면증', icon: '🌙' },
      { id: 'sleep3', title: '졸림', icon: '😴' },
      { id: 'skin', title: '섹사', icon: '🥛' },
      { id: 'hair2', title: '발바', icon: '🍌' },
      { id: 'omega', title: '악래르기버', icon: '🐟' },
      { id: 'vitaminC', title: '과인성당과', icon: '🍊' }
    ],
    '기본': [
      { id: 'basic1', title: '비타민', icon: '💊' },
      { id: 'basic2', title: '미네랄', icon: '⚡' },
      { id: 'basic3', title: '오메가3', icon: '🐟' },
      { id: 'basic4', title: '프로바이오틱스', icon: '🦠' },
      { id: 'basic5', title: '칼슘', icon: '🦴' },
      { id: 'basic6', title: '철분', icon: '🩸' },
      { id: 'basic7', title: '아연', icon: '⚡' },
      { id: 'basic8', title: '마그네슘', icon: '💪' }
    ],
    '여성': [
      { id: 'women1', title: '엽산', icon: '🌸' },
      { id: 'women2', title: '철분', icon: '🩸' },
      { id: 'women3', title: '칼슘', icon: '🦴' },
      { id: 'women4', title: '콜라겐', icon: '✨' },
      { id: 'women5', title: '히알루론산', icon: '💧' },
      { id: 'women6', title: '이소플라본', icon: '🌱' },
      { id: 'women7', title: '크랜베리', icon: '🫐' },
      { id: 'women8', title: '유산균', icon: '🦠' }
    ]
  };

  // 패널 콘텐츠 데이터
  const panelSections = {
    title: '몸상태 선택 가이드',
    sections: [
      {
        title: '현재 화면',
        items: [
          '몸상태 선택 화면',
          '탭별 세분화된 컨디션 분류',
          '개인 맞춤형 영양 조합 설정'
        ]
      },
      {
        title: '탭 메뉴',
        items: [
          '커스텀: 개인 맞춤 설정',
          '심장: 심혈관 건강 관련',
          '중성: 일반적인 건강 관리',
          '기본: 필수 영양소',
          '여성: 여성 전용 케어'
        ]
      },
      {
        title: '사용 방법',
        items: [
          '탭을 선택하여 카테고리 변경',
          '카드 터치로 1→2→3→해제 순환',
          '여러 항목 동시 선택 가능',
          '선택 수는 우측 상단 뱃지 표시'
        ]
      },
      {
        title: '다음 단계',
        items: [
          '선택 완료 후 맞춤 조합 생성',
          '선택 없이도 기본 조합 가능',
          '개인화된 영양제 추천',
          '실시간 조합 프로세스 시작'
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

  // 카드 클릭 핸들러
  const handleCardClick = (cardId: string) => {
    setCardSelections(prev => {
      const currentCount = prev[cardId] || 0;
      const selectedCardIds = Object.keys(prev).filter(id => prev[id] > 0);
      
      if (currentCount === 0) {
        // 선택되지 않은 카드를 클릭할 때
        if (selectedCardIds.length < 10) {
          // 10개 미만이면 선택 가능
          return {
            ...prev,
            [cardId]: 1
          };
        }
        // 10개 이미 선택된 경우 아무것도 하지 않음
        return prev;
      } else {
        // 이미 선택된 카드를 클릭할 때 (1→2→3→0 순환)
        const newCount = currentCount >= 3 ? 0 : currentCount + 1;
        
        if (newCount === 0) {
          // 선택 해제
          const { [cardId]: removed, ...rest } = prev;
          return rest;
        } else {
          // 카운트 증가
          return {
            ...prev,
            [cardId]: newCount
          };
        }
      }
    });
  };

  // 선택된 카드가 있는지 확인
  const hasSelectedCards = Object.values(cardSelections).some(count => count > 0);
  
  // 선택된 카드 개수 확인
  const selectedCount = Object.values(cardSelections).filter(count => count > 0).length;

  // CTA 버튼 클릭 핸들러
  const handleCTAClick = () => {
    console.log('CTA 버튼 클릭됨'); // 디버깅용
    openBottomSheet();
  };

  return (
    <MainContainer>
      <CenterContent>
        <DeviceFrame>
          {/* 메인 콘텐츠 */}
          <Content>
            {/* 상단 고정 영역 - 상태바, 헤더, 탭 모두 포함 */}
            <HeaderContainer data-header-container>
              {/* 상단 상태바 */}
              <StatusBar />
              
              {/* 헤더 */}
              <Header>
                <HeaderTitle>이대로 프로님의 몸상태를 선택해 주세요.</HeaderTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.gray[600] }}>
                    {selectedCount}/10
                  </span>
                  <CloseButton onClick={() => window.location.href = '/'}>✕</CloseButton>
                </div>
              </Header>
              
              {/* 탭 메뉴 */}
              <TabContainer>
                {tabs.map((tab) => (
                  <TabButton
                    key={tab}
                    isActive={activeTab === tab}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      console.log('탭 클릭:', tab); // 디버깅용
                      scrollToSection(tab);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {tab}
                  </TabButton>
                ))}
              </TabContainer>
            </HeaderContainer>
            
            {/* 스크롤 가능 영역 */}
            <ScrollableContent data-content-container>
              <SectionContainer>
              {/* 모든 카테고리 섹션들 */}
              {tabs.map((tabName) => (
                <div key={tabName} id={`section-${tabName}`}>
                  <SectionTitle>{tabName}</SectionTitle>
                  <CardsGrid>
                    {(conditionsByTab[tabName as '커스텀' | '심장' | '중성' | '기본' | '여성'] || []).map((card) => (
                      <CompactCard
                        key={card.id}
                        isSelected={cardSelections[card.id] > 0}
                        onClick={() => handleCardClick(card.id)}
                      >
                        <CardIcon isSelected={cardSelections[card.id] > 0}>
                          {card.icon}
                        </CardIcon>
                        <CardLabel isSelected={cardSelections[card.id] > 0}>
                          {card.title}
                        </CardLabel>
                        {cardSelections[card.id] > 0 && (
                          <Badge>{cardSelections[card.id]}</Badge>
                        )}
                      </CompactCard>
                    ))}
                  </CardsGrid>
                </div>
              ))}
              </SectionContainer>
            </ScrollableContent>
            
            {/* 하단 고정 섹션 */}
            <BottomSection>
              <BottomText>
                오늘의 몸상태를 선택하고<br />
                맞춤 영양 조합을 시작하세요.
              </BottomText>
              <CTAButton 
                disabled={false}
                onClick={handleCTAClick}
              >
                {hasSelectedCards ? '선택한 상태로 조합 시작' : '기본 조합으로 시작'}
              </CTAButton>
            </BottomSection>
          </Content>
          {/* 바텀시트 */}
          <BottomSheetOverlay 
            isOpen={isBottomSheetOpen} 
            onClick={closeBottomSheet}
          />
          
          <BottomSheetContainer isOpen={isBottomSheetOpen}>
            <BottomSheetHandle onClick={closeBottomSheet} />
            
            <BottomSheetHeader>
              <BottomSheetTitle>{hasSelectedCards ? '선택 내용 확인' : '기본 조합 생성'}</BottomSheetTitle>
              <BottomSheetSubtitle>
                {hasSelectedCards ? 
                  `선택하신 ${selectedCount}개 항목으로 맞춤 조합을 생성합니다` :
                  '기본 추천 조합으로 영양소를 생성합니다'
                }
              </BottomSheetSubtitle>
            </BottomSheetHeader>
            
            <BottomSheetContent>
              <ResultSection>
                <ResultText>
                  선택하신 몸상태를 기반으로<br />
                  AI가 최적의 영양소 조합을 분석해드립니다.
                </ResultText>
                
                <BottomSheetButton onClick={() => window.location.href = '/confirm'}>
                  조합 생성 시작하기
                </BottomSheetButton>
              </ResultSection>
            </BottomSheetContent>
          </BottomSheetContainer>
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