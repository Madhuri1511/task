import * as React from "react"
import { IDataProvider } from "../../../Services/Interface/IDataProvider"
import IPnPQueryOptions from "../../../Services/Interface/IPnPQueryOptions";
import { MainBanner } from "../../../Common/ListConstants";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import "../../../assets/css/animate.min.css" 
import "../../../assets/css/slick-theme.css"
import "../../../assets/css/slick.css"
import "../../../assets/css/style.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    autoplay: true,
  };
export interface IImageProps {
    provider: IDataProvider;
}
export const HomeImageSliders = (props: IImageProps) => {

    const [slideImage, setSlideImage] = React.useState<any>([])
    const getBannerdata = async () => {
        //  const Active="Yes"
        const queryOptions: IPnPQueryOptions = {
            select: ["*", "Id", "Title", "Description1", "Description2", "Image","Active"],
            listName: MainBanner,
           filter:`Active eq 'Yes'`
        };

        await props.provider.getAllItems(queryOptions).then((res: any) => {
            const data = res.map((i: any) => {
                const imageJSON = JSON.parse(i.Image);
                return {
                    url: imageJSON.serverRelativeUrl,
                    // caption: i.Title

                }
            })
            setSlideImage(data)
        })
    }
    React.useEffect(() => {
        void getBannerdata()
    }, [])
    return (
        <>
        
                <div className="slider-container">
                    {
                         <Slider {...settings}>
                        {slideImage.map((i: any) => {
                            return (
                                    <img src={i.url} height={500} width={700}></img>
                               
                            )
                        })} 
                        </Slider>
                    }
                </div>
            
                
            
        </>

    )
}

{/* <SimpleImageSlider
        width={1000}
        height={504}
        images={slideImage}
        showBullets={true}
        startIndex={1}
        slideDuration={0.2}
        autoPlay={true}
      />
         <AutoplaySlider
    play={true}
    cancelOnInteraction={false}
    interval={6000}
    
  >
    <div data-src="/path/to/image-0.jpg" />
    <div data-src="/path/to/image-1.jpg" />
    <div data-src="/path/to/image-2.jpg" />
    <div data-src="/path/to/image-3.jpg" />
  </AutoplaySlider> */}


