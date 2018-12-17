import React, { Component } from 'react'

class ProdImg extends Component {
    state={
        lightbox: false,
        imagePos: 0,
        lightboxImages : []
    }
    componentDidMount(){
        if(this.props.detail.images.length > 0){
            let lightboxImages =[];
            this.props.detail.images.forEach(item => {
                lightboxImages.push(item.url)
            });
            this.setState({
                lightboxImages
            })
        }
    }

    
    renderCardImage = (images) => {
        if(images.length > 0){
            return images[0].url
        }else{
            return `/images/featured/no-image.jpg`
        }
    }



  render() {
    //   console.log(this.state)
    const {detail} = this.props;

    return (
      <div className = 'product_image_container'>
      <div className = 'main_pic'>
      <div
       style={{background:`url(${this.renderCardImage(detail.images)}) no-repeat`}}
      
      >

      </div>
      </div>
        
      </div>
    )
  }
}
export default ProdImg;
