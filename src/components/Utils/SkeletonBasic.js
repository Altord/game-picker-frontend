import React from "react"
import ContentLoader from "react-content-loader"

//Loading skeleton for frong page
const BasicLoader = (props) => (
    <ContentLoader
        speed={2}
        width={152.4}
        height={271}
        viewBox="0 0 152.4 271"
        backgroundColor="#1e3d6a"
        foregroundColor="#274e88"
        {...props}
    >
        <rect x="5" y="234" rx="2" ry="2" width="140" height="10" />
        <rect x="-2" y="0" rx="2" ry="2" width="152" height="189" />
    </ContentLoader>
)

//Maps it out to 7 cards
const LoaderMapped = ()=>{
    const basicArray = []
    for (let i=0; i < 7; i++){
        basicArray.push(<BasicLoader/>)
    }
    return basicArray
}
export default LoaderMapped

