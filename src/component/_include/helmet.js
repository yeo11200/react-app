import React from 'react';
import { Helmet } from 'react-helmet';
import image from '../../assets/image/webdeveloper-green.png'
const ReactHelmet = ({children, description, keywords}) => {

    console.log(children);

    return(
        <Helmet>
            <meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<title>{children}</title>
			<meta property="og:title" content={children} />
			<meta property="og:image" content={image} />
			<meta property="og:site_name" content="" />
			<meta property="og:description" content={description} />
        </Helmet>
    )
}

export default ReactHelmet;