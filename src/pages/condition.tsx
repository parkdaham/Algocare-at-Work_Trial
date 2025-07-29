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
  background-color: #F9F9F9;
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
  padding: calc(20px * var(--device-scale, 1)) calc(20px * var(--device-scale, 1)) calc(8px * var(--device-scale, 1)) calc(20px * var(--device-scale, 1));
`;

const HeaderTitle = styled.h1`
  color: #010101;
  font-family: Pretendard;
  font-size: calc(24px * var(--device-scale, 1));
  font-style: normal;
  font-weight: 600;
  line-height: calc(28px * var(--device-scale, 1));
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: calc(20px * var(--device-scale, 1));
  color: ${theme.colors.gray[600]};
  cursor: pointer;
  padding: calc(4px * var(--device-scale, 1));
  
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
  background-color: #F9F9F9;
  z-index: 50;
  //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0px 8px 80px 8px; // 하단 버튼 영역 공간 확보
  
  /* 스크롤바 숨기기 - webkit 브라우저 */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* 스크롤바 숨기기 - Firefox */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// 탭 메뉴
const TabContainer = styled.div`
  display: flex;
  background-color: #FEFEFE;
  border-radius: calc(8px * var(--device-scale, 1));
  margin: calc(16px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1)) calc(8px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1));
  padding: calc(4px * var(--device-scale, 1));
  position: relative;
  z-index: 15;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: calc(10px * var(--device-scale, 1)) calc(4px * var(--device-scale, 1));
  border: none;
  background-color: ${props => props.isActive ? '#21242C' : 'transparent'};
  color: ${props => props.isActive ? '#FEFEFE' : '#828282'};
  border-radius: calc(10px * var(--device-scale, 1));
  text-align: center;
  font-family: Pretendard;
  font-size: calc(18px * var(--device-scale, 1));
  font-style: normal;
  font-weight: 600;
  line-height: calc(24px * var(--device-scale, 1));
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.isActive ? '0ms' : '50ms'};
  position: relative;
  z-index: 20;
  pointer-events: auto;
  transform: scale(${props => props.isActive ? 1 : 0.98});
  
  &:hover {
    background-color: ${props => props.isActive ? '#21242C' : theme.colors.gray[200]};
    transform: scale(1);
    transition-delay: 0ms;
  }
`;

const SectionContainer = styled.div`
  padding: calc(24px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1)) calc(80px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1));
  flex: 1;
  overflow-y: auto;
  
  /* 스크롤바 숨기기 - webkit 브라우저 */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* 스크롤바 숨기기 - Firefox */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const SectionTitle = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: calc(22px * var(--device-scale, 1));
  font-style: normal;
  font-weight: 600;
  line-height: calc(24px * var(--device-scale, 1));
  margin-bottom: calc(20px * var(--device-scale, 1));
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: calc(12px * var(--device-scale, 1));
  margin-bottom: calc(40px * var(--device-scale, 1));
`;

const CompactCard = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  width: calc(116px * var(--device-scale, 1));
  height: calc(134px * var(--device-scale, 1));
  padding: calc(14px * var(--device-scale, 1)) calc(15px * var(--device-scale, 1)) calc(12px * var(--device-scale, 1)) calc(15px * var(--device-scale, 1));
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: calc(4px * var(--device-scale, 1));
  background-color: ${theme.colors.white};
  border: none;
  border-radius: calc(12px * var(--device-scale, 1));
  box-shadow: ${props => props.isSelected ? 
    `inset 0 0 0 calc(3.4px * var(--device-scale, 1)) #EF3340` : 
    'none'
  };
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

const CardIcon = styled.img<{ isSelected: boolean }>`
  width: calc(80px * var(--device-scale, 1));
  height: calc(80px * var(--device-scale, 1));
  object-fit: contain;
  object-position: center;
  filter: none;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

const CardLabel = styled.span<{ isSelected: boolean }>`
  font-size: calc(18px * var(--device-scale, 1));
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  user-select: none;
  pointer-events: none;
`;

const Badge = styled.div`
  position: absolute;
  top: calc(-6px * var(--device-scale, 1));
  right: calc(-6px * var(--device-scale, 1));
  display: flex;
  width: calc(36px * var(--device-scale, 1));
  height: calc(36px * var(--device-scale, 1));
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #EF3340;
  color: ${theme.colors.white};
  border-radius: 50%;
  font-size: calc(18px * var(--device-scale, 1));
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 calc(2px * var(--device-scale, 1)) calc(4px * var(--device-scale, 1)) rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
`;

const BottomSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: calc(24px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1)) calc(32px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1));
  border-top: calc(1px * var(--device-scale, 1)) solid ${theme.colors.gray[100]};
  background-color: ${theme.colors.white};
  border-radius: calc(24px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1)) 0 0;
  box-shadow: 0 calc(-4px * var(--device-scale, 1)) calc(12px * var(--device-scale, 1)) rgba(0, 0, 0, 0.04);
  z-index: 5;
`;

const BottomText = styled.p`
  font-size: calc(20px * var(--device-scale, 1));
  font-weight: 500;
  color: ${theme.colors.gray[600]};
  text-align: center;
  margin-bottom: calc(22px * var(--device-scale, 1));
  line-height: 1.4;
`;

const CTAButton = styled.button<{ disabled: boolean }>`
  display: flex;
  width: calc(536px * var(--device-scale, 1));
  height: calc(80px * var(--device-scale, 1));
  padding: calc(23px * var(--device-scale, 1)) calc(179px * var(--device-scale, 1));
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: calc(16px * var(--device-scale, 1));
  background: ${props => props.disabled ? '#E0E0E0' : '#000000'};
  color: ${theme.colors.white};
  border: none;
  font-size: calc(24px * var(--device-scale, 1));
  font-weight: 600;
  white-space: nowrap;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #333333;
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
  border-radius: calc(24px * var(--device-scale, 1)) calc(24px * var(--device-scale, 1)) calc(16px * var(--device-scale, 1)) calc(16px * var(--device-scale, 1));
  z-index: 101;
  transform: translateY(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  max-height: 70%;
  overflow-y: auto;
`;

const BottomSheetHandle = styled.div`
  width: calc(40px * var(--device-scale, 1));
  height: calc(4px * var(--device-scale, 1));
  background-color: ${theme.colors.gray[300]};
  border-radius: calc(2px * var(--device-scale, 1));
  margin: calc(12px * var(--device-scale, 1)) auto calc(20px * var(--device-scale, 1));
  cursor: pointer;
`;

const BottomSheetHeader = styled.div`
  text-align: center;
  padding: 0 calc(24px * var(--device-scale, 1)) calc(20px * var(--device-scale, 1));
  border-bottom: calc(1px * var(--device-scale, 1)) solid ${theme.colors.gray[100]};
`;

const BottomSheetTitle = styled.h2`
  font-size: calc(24px * var(--device-scale, 1));
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: calc(8px * var(--device-scale, 1));
`;

const BottomSheetSubtitle = styled.p`
  font-size: calc(16px * var(--device-scale, 1));
  color: ${theme.colors.gray[600]};
  margin: 0;
`;

const BottomSheetContent = styled.div`
  padding: calc(24px * var(--device-scale, 1));
`;

const ResultSection = styled.div`
  text-align: center;
  padding: calc(20px * var(--device-scale, 1)) 0;
`;

const ResultText = styled.p`
  font-size: calc(16px * var(--device-scale, 1));
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: calc(24px * var(--device-scale, 1));
`;

const BottomSheetButton = styled.button`
  width: 100%;
  padding: calc(16px * var(--device-scale, 1));
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: calc(12px * var(--device-scale, 1));
  font-size: calc(18px * var(--device-scale, 1));
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
  const tabs = ['커스텀', '기분', '상황', '증상', '여성'];
  
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

  // 스크롤 위치 기반 탭 활성화
  useEffect(() => {
    const contentElement = document.querySelector('[data-content-container]');
    const headerElement = document.querySelector('[data-header-container]');
    if (!contentElement || !headerElement) return;

    const handleScroll = () => {
      const headerHeight = headerElement.getBoundingClientRect().height;
      const scrollTop = contentElement.scrollTop;
      const scrollHeight = contentElement.scrollHeight;
      const clientHeight = contentElement.clientHeight;
      
      // 1. 최상단 예외처리 (상위 5% 이내)
      if (scrollTop < clientHeight * 0.05) {
        setActiveTab(tabs[0]);
        return;
      }
      
      // 2. 최하단 예외처리 (하위 10% 이내)
      if (scrollTop + clientHeight > scrollHeight - clientHeight * 0.1) {
        setActiveTab(tabs[tabs.length - 1]);
        return;
      }
      
      // 3. 일반 섹션 비율 기반 활성화
      for (let i = 0; i < tabs.length; i++) {
        const currentSection = document.getElementById(`section-${tabs[i]}`);
        const nextSection = i < tabs.length - 1 ? document.getElementById(`section-${tabs[i + 1]}`) : null;
        
        if (currentSection) {
          // 섹션이 뷰포트 상단 20% 지점에 도달하면 활성화
          const activationPoint = currentSection.offsetTop - headerHeight - (clientHeight * 0.2);
          const nextActivationPoint = nextSection 
            ? nextSection.offsetTop - headerHeight - (clientHeight * 0.2)
            : Infinity;
          
          // 현재 스크롤 위치가 현재 섹션의 활성화 지점과 다음 섹션의 활성화 지점 사이에 있으면 활성화
          if (scrollTop >= Math.max(0, activationPoint) && scrollTop < nextActivationPoint) {
            setActiveTab(tabs[i]);
            break;
          }
        }
      }
    };

    // 초기 실행
    handleScroll();
    
    // 스크롤 이벤트 리스너 등록
    contentElement.addEventListener('scroll', handleScroll);
    
    return () => {
      contentElement.removeEventListener('scroll', handleScroll);
    };
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
      { id: 'custom1', title: '숙취 헬퍼', icon: 'custom pack/soju.svg' },
      { id: 'custom2', title: '졸린 하루', icon: 'custom pack/sleep.svg' },
      { id: 'custom3', title: '헬스 보충', icon: 'custom pack/health supplement.svg' },
      { id: 'custom4', title: '피부 촉촉', icon: 'custom pack/skin moisture.svg' }
    ],
    '상황': [
      { id: 'before-drinking', title: '음주 예정', icon: 'before-drinking.svg' },
      { id: 'after-drinking', title: '음주 후', icon: 'after-drinking.svg' },
      { id: 'before-exercise', title: '운동 예정', icon: 'before-exercise.svg' },
      { id: 'after-exercise', title: '운동 후', icon: 'after-exercise.svg' },
      { id: 'working-overtime', title: '야근', icon: 'working-overtime.svg' },
      { id: 'lack-of-sleep', title: '수면부족', icon: 'lack-of-sleep.svg' },
      { id: 'monday-blues', title: '월요병', icon: 'mondayblues.svg' },
      { id: 'stress', title: '스트레스', icon: 'stress.svg' }
    ],
    '증상': [
      { id: 'fatigue', title: '피로', icon: 'fatigue.svg' },
      { id: 'lethargy', title: '무기력', icon: 'lethargy.svg' },
      { id: 'burnout', title: '번아웃', icon: 'burn-out.svg' },
      { id: 'drowsiness', title: '졸림', icon: 'drowsiness.svg' },
      { id: 'eye-strain', title: '눈피로', icon: 'eye-strain.svg' },
      { id: 'headache', title: '두통', icon: 'headache.svg' },
      { id: 'migraine', title: '편두통', icon: 'migraine.svg' },
      { id: 'insomnia', title: '불면증', icon: 'insomnia.svg' },
      { id: 'indigestion', title: '소화불량', icon: 'indigestion.svg' },
      { id: 'heartburn', title: '속쓰림', icon: 'heartburn.svg' },
      { id: 'constipation', title: '변비', icon: 'constipation.svg' },
      { id: 'muscle-cramps', title: '근육경련', icon: 'muscle-cramps.svg' },
      { id: 'muscle-pain', title: '근육통', icon: 'muscle-pain.svg' },
      { id: 'cold-hands-feet', title: '수족냉증', icon: 'cold-hands-and-feet.svg' },
      { id: 'acne', title: '여드름', icon: 'acne.svg' },
      { id: 'common-cold', title: '감기', icon: 'common-cold.svg' },
      { id: 'runny-nose', title: '콧물', icon: 'runny-nose.svg' },
      { id: 'sore-throat', title: '목아픔', icon: 'sore-throat.svg' },
      { id: 'allergic-rhinitis', title: '비염', icon: 'allergic-rhinitis.svg' },
      { id: 'atopic-dermatitis', title: '아토피', icon: 'atopic-dermatitis.svg' }
    ],
    '기분': [
      { id: 'depression', title: '우울', icon: 'depressed.svg' },
      { id: 'sadness', title: '슬픔', icon: 'sadness.svg' },
      { id: 'anxiety', title: '불안', icon: 'anxiety.svg' },
      { id: 'tension', title: '긴장', icon: 'tensity.svg' },
      { id: 'sensitive', title: '예민', icon: 'sensitive.svg' },
      { id: 'irritation', title: '짜증', icon: 'irritation.svg' }
    ],
    '여성': [
      { id: 'menstrual-period', title: '생리중', icon: 'menstrual-period.svg' },
      { id: 'pms', title: 'PMS증후군', icon: 'PMS.svg' },
      { id: 'menstrual-pain', title: '생리통', icon: 'menstrual-pain.svg' }
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
            '기분: 감정 상태별 케어',
            '상황: 생활 상황별 케어',
            '증상: 몸의 증상별 관리',
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
          {/* 상단 상태바 */}
          <StatusBar />
          
          {/* 메인 콘텐츠 */}
          <Content>
            {/* 상단 고정 영역 - 헤더, 탭 포함 */}
            <HeaderContainer data-header-container>
              
              {/* 헤더 */}
              <Header>
                <HeaderTitle>김알고님의<br /> 몸상태를 선택해 주세요</HeaderTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(20px * var(--device-scale, 1))' }}>
                  <span style={{ fontSize: 'calc(20px * var(--device-scale, 1))', color: theme.colors.gray[600] }}>
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
                    {(conditionsByTab[tabName as '커스텀' | '기분' | '상황' | '증상' | '여성'] || []).map((card) => (
                      <CompactCard
                        key={card.id}
                        isSelected={cardSelections[card.id] > 0}
                        onClick={() => handleCardClick(card.id)}
                      >
                        <CardIcon 
                          isSelected={cardSelections[card.id] > 0}
                          src={`/images/icons/${card.icon}`}
                          alt={card.title}
                          draggable={false}
                        />
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
                disabled={!hasSelectedCards}
                onClick={handleCTAClick}
              >
                {hasSelectedCards ? '오늘의 영양 받기' : '몸상태를 알려주세요'}
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