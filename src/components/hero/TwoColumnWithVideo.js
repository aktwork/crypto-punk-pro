import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Counter from "components/counter/CounterDown"
import { useHistory } from 'react-router-dom'


import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";

import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const WatchVideoButton = styled.button`
  ${tw`mt-4 sm:mt-0 sm:ml-8 flex items-center text-secondary-300 transition duration-300 hocus:text-primary-400 focus:outline-none`}
  .playIcon {
    ${tw`stroke-1 w-12 h-12`}
  }
  .playText {
    ${tw`ml-2 font-medium`}
  }
`;


// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10`}
`;

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;


function Hero({
                heading= "Ad infinitum Ad",
                description= "",
                watchVideoButtonText= "Watch Video",
                watchVideoYoutubeUrl= "https://www.youtube.com/embed/_GuOjXYl5ew",
              }){
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [primaryBtnText,setPrimaryBtnText] = useState('Hold On');
    const toggleModal = () => setModalIsOpen(!modalIsOpen);
    
    const handleCountEnd= () =>{
      setPrimaryBtnText('Buy now');
    }
    const handleBuyNowClick = () => {
      if(primaryBtnText === 'Buy now'){
        history.push(`/gotran`);
      }
    }
    return(
      <>      
        <Container>
          <TwoColumn>                        
            <LeftColumn>
              <Heading className="pixel-font">{heading}</Heading>
              <Paragraph>{description}</Paragraph>
              <Actions>
                  <PrimaryButton onClick={()=>handleBuyNowClick()} className="pixel-font" as="a" href='#/'>{primaryBtnText}</PrimaryButton>
                <WatchVideoButton onClick={toggleModal}>
                  <span className="playIconContainer">
                    <PlayIcon className="playIcon" />
                  </span>
                  <span className="playText">{watchVideoButtonText}</span>
                </WatchVideoButton>
              </Actions>
            </LeftColumn>
            <RightColumn>
                <Counter handleCountEnd={()=>handleCountEnd()} />
            </RightColumn>            
          </TwoColumn>
          <DecoratorBlob1 />
          <StyledModal
            closeTimeoutMS={300}
            className="mainHeroModal"
            isOpen={modalIsOpen}
            onRequestClose={toggleModal}
            shouldCloseOnOverlayClick={true}
          >
            <CloseModalButton onClick={toggleModal}>
              <CloseIcon tw="w-6 h-6" />
            </CloseModalButton>
            <div className="content">
              <ResponsiveVideoEmbed url={watchVideoYoutubeUrl} tw="w-full" />
            </div>
          </StyledModal>
        </Container>
      </>      
      
    )
}

export default Hero