import React from "react"
import ContentLoader from "react-content-loader"

const BasicLoader = (props) => (
    <ContentLoader
        speed={2}
        width={264}
        height={352}
        viewBox="0 0 264 352"
        backgroundColor="#1e3d6a"
        foregroundColor="#274e88"
        {...props}
    >
        <rect x="-2" y="0" rx="2" ry="2" width="264" height="352" />
    </ContentLoader>
)

const RecSkeletonMapped = ()=>{
    const basicArray = []
    for (let i=0; i < 12; i++){
        basicArray.push(<BasicLoader/>)
    }
    return basicArray
}
export default RecSkeletonMapped

