'use client';

// pages/dimension/[category]
import { useEffect, useState } from 'react';
import styles from '../../../../styles/Dimension/DimensionPage.module.scss';
import TopSize from '../../../../components/Dimension/TopSize';
import BottomSize from '../../../../components/Dimension/BottomSize';
import OuterSize from '../../../../components/Dimension/OuterSize';
import ShoesSize from '../../../../components/Dimension/ShoesSize';
import { useRouter } from 'next/navigation';
import MoveLoginModal from '../../../../components/MoveLoginModal';

interface DimensionProps {
    params: {
        category: string;
    };
}

const dimensionCategory: React.FC<DimensionProps> = ({ params }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<string>('');
    const router = useRouter();

    const handleComponentChange = (component: string) => {
        setSelectedComponent(component);

        // DOM 조작은 useEffect에서 하도록 수정했기 때문에 여긴 state만 변경
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            setIsModalOpen(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const components = document.querySelectorAll(`.${styles.components}`);
        components.forEach((component) => {
            component.classList.remove(styles.changedComponent2);
        });

        const indexMap: { [key: string]: number } = {
            top: 1,
            bottom: 2,
            outer: 3,
            shoes: 4,
        };

        const targetIndex = indexMap[params.category];
        if (targetIndex) {
            const target = document.querySelector(
                `.${styles.components_Div} > .${styles.components}:nth-child(${targetIndex})`
            );
            if (target) {
                target.classList.add(styles.changedComponent2);
            }
        }
    }, [params.category]);

    const renderComponent = () => {
        switch (params.category) {
            case 'top':
                return <TopSize />;
            case 'bottom':
                return <BottomSize />;
            case 'outer':
                return <OuterSize />;
            case 'shoes':
                return <ShoesSize />;
            default:
                return null;
        }
    };

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        router.push('/login');
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.components_Div}>
                    <div
                        className={`${styles.components} ${selectedComponent === '상의' ? styles.changedComponent : ''
                            }`}
                        onClick={() => handleComponentChange('상의')}
                    >
                        상의
                    </div>
                    <div
                        className={`${styles.components} ${selectedComponent === '하의' ? styles.changedComponent : ''
                            }`}
                        onClick={() => handleComponentChange('하의')}
                    >
                        하의
                    </div>
                    <div
                        className={`${styles.components} ${selectedComponent === '아우터' ? styles.changedComponent : ''
                            }`}
                        onClick={() => handleComponentChange('아우터')}
                    >
                        아우터
                    </div>
                    <div
                        className={`${styles.components} ${selectedComponent === '신발' ? styles.changedComponent : ''
                            }`}
                        onClick={() => handleComponentChange('신발')}
                    >
                        신발
                    </div>
                </div>
                {/* 이 부분 체크 */}
                {!selectedComponent && <div>{renderComponent()}</div>}
                {selectedComponent === '상의' && <TopSize />}
                {selectedComponent === '하의' && <BottomSize />}
                {selectedComponent === '아우터' && <OuterSize />}
                {selectedComponent === '신발' && <ShoesSize />}
                <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
            </div>
        </>
    );
};

export default dimensionCategory;
