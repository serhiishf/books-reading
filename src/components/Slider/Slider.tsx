import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Slider.module.scss';
import srcPath from '../../assets/img/authors/maryna.jpg';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Slider: React.FC<Props> = ({ children }) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      transitionDuration={1000}
      keyBoardControl={true}
      removeArrowOnDeviceType={['mobile']}
      responsive={responsive}
      containerClass={styles.carouselContainer}
      dotListClass={styles.carouselDots}
      itemClass={styles.carouselItem}
    >
      {children}
      {/* <img src={srcPath} alt="" height="400" />
      <img src={srcPath} alt="" height="400" />
      <img src={srcPath} alt="" height="400" /> */}
    </Carousel>
  );
};

export default Slider;
