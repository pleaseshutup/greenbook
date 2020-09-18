import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import css_content from '../css/home.module.css';
import { getContent, getListings } from "../utils/getListings";
import ContentPageHeader from "../components/ContentPageHeader";
import Stripe from "../components/Stripe";
import {RichText} from 'prismic-reactjs';
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default (props) => {

    const [ content, setContent ] = useState(props.content);
    console.log('cotnent', content);
    let query = {};
    if (typeof window !== "undefined") {
        let params = (window.location.search || "")
            .substr(1)
            .split("&")
            .forEach((pair) => {
                var spl = pair.split("=");
                query[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
            });
        console.log("props", props, "query", query);

        if (query.preview) {
            console.log('execute preview ref_id', query.preview)
            useEffect(
                () => {
                    getData({preview: query.preview}).then(get_content => {
                        setContent(get_content);
                        console.log('updated content', get_content, content)
                    });
                },
                [ ]
            );
        }
    }


    if (typeof window !== 'undefined') {
        console.log('props', props)
    }

    console.log('donate rerender')

    return (
        <div>
            <Head>
                <title>{content.page_title} - Spicy Green Book</title>
                {content.description && 
                    <meta
                    name="description"
                    content={content.description}
                    key="description"
                    />
                }
                {content.description && 
                    <meta
                    name="og:description"
                    content={content.description}
                    key="og:description"
                    />
                }
                <meta property="og:title" content={content.page_title + " - Spicy Green Book"} key="title" />
                <meta property="og:url" content={"https://spicygreenbook.com/" + content.uid } key="og:url" />
            </Head>
            <header>
                <Menu mode="content" />
            </header>
            <div id="page">
                <ContentPageHeader />
                <div className="content" style={{padding: '40px 20px'}}>
                    <h1>{content.page_title}</h1>
                    {RichText.render(content._body.value)}

                    <div style={{marginTop: 10}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="99" height="23" viewBox="0 0 99 23">
                          <title>Powered by Stripe</title>
                          <g fill="#8898AA" fillRule="evenodd" transform="translate(.418 .97)">
                            <path d="M93.5407493,21.5226503 L4.96676545,21.5226503 C2.22345533,21.5226503 0,19.299195 0,16.5558848 L0,4.96676545 C0,2.22345533 2.22345533,0 4.96676545,0 L93.5407493,0 C96.2840595,0 98.5075148,2.22345533 98.5075148,4.96676545 L98.5075148,16.5558848 C98.5075148,19.299195 96.2840595,21.5226503 93.5407493,21.5226503 Z M97.6797206,4.96676545 C97.6797206,2.68122555 95.8262892,0.827794242 93.5407493,0.827794242 L4.96676545,0.827794242 C2.68122555,0.827794242 0.827794242,2.68122555 0.827794242,4.96676545 L0.827794242,16.5558848 C0.827794242,18.8414247 2.68122555,20.694856 4.96676545,20.694856 L93.5407493,20.694856 C95.8262892,20.694856 97.6797206,18.8414247 97.6797206,16.5558848 L97.6797206,4.96676545 Z" opacity=".749"></path>
                            <path d="M50.2471105 15.2620424L49.166839 15.2620424 50.0029112 13.1975236 48.3390448 8.9989512 49.480573 8.9989512 50.5260771 11.8564969 51.5798592 8.9989512 52.7213875 8.9989512 50.2471105 15.2620424zM46.0998613 13.4591066C45.7256983 13.4591066 45.3416018 13.3200371 44.9939282 13.0493484L44.9939282 13.3548045 43.8788894 13.3548045 43.8788894 7.09088548 44.9939282 7.09088548 44.9939282 9.29530154C45.3416018 9.03371856 45.7256983 8.89464913 46.0998613 8.89464913 47.2670512 8.89464913 48.068356 9.83502339 48.068356 11.1768779 48.068356 12.5179045 47.2670512 13.4591066 46.0998613 13.4591066zM45.8647678 9.85240707C45.5601395 9.85240707 45.2546834 9.98319856 44.9939282 10.2447815L44.9939282 12.1089742C45.2546834 12.3697294 45.5601395 12.5005208 45.8647678 12.5005208 46.4922358 12.5005208 46.9276556 11.960799 46.9276556 11.1768779 46.9276556 10.3929567 46.4922358 9.85240707 45.8647678 9.85240707zM39.3649274 13.0493484C39.0255317 13.3200371 38.642263 13.4591066 38.2589943 13.4591066 37.1000823 13.4591066 36.2904996 12.5179045 36.2904996 11.1768779 36.2904996 9.83502339 37.1000823 8.89464913 38.2589943 8.89464913 38.642263 8.89464913 39.0255317 9.03371856 39.3649274 9.29530154L39.3649274 7.09088548 40.489072 7.09088548 40.489072 13.3548045 39.3649274 13.3548045 39.3649274 13.0493484zM39.3649274 10.2447815C39.1124501 9.98319856 38.8078219 9.85240707 38.5031936 9.85240707 37.8666198 9.85240707 37.4312 10.3929567 37.4312 11.1768779 37.4312 11.960799 37.8666198 12.5005208 38.5031936 12.5005208 38.8078219 12.5005208 39.1124501 12.3697294 39.3649274 12.1089742L39.3649274 10.2447815zM32.7268454 11.4815061C32.7963801 12.1437415 33.319546 12.596545 34.0504884 12.596545 34.4519686 12.596545 34.8956663 12.4483698 35.3484697 12.1867868L35.3484697 13.1197109C34.852621 13.3456988 34.3559444 13.4591066 33.8675458 13.4591066 32.5521808 13.4591066 31.6291902 12.5005208 31.6291902 11.1421105 31.6291902 9.82674545 32.5347971 8.89464913 33.7806274 8.89464913 34.9221557 8.89464913 35.6969711 9.79197809 35.6969711 11.071748 35.6969711 11.1942615 35.6969711 11.333331 35.6795874 11.4815061L32.7268454 11.4815061zM33.7375821 9.75638294C33.1970325 9.75638294 32.7789964 10.1578631 32.7268454 10.7588418L34.6258053 10.7588418C34.591038 10.1661411 34.2342587 9.75638294 33.7375821 9.75638294zM29.7906592 10.4451077L29.7906592 13.3548045 28.6756203 13.3548045 28.6756203 8.9989512 29.7906592 8.9989512 29.7906592 9.43437098C30.1043932 9.0858696 30.4876619 8.89464913 30.8618249 8.89464913 30.9843385 8.89464913 31.1060242 8.90292707 31.22771 8.93769443L31.22771 9.93104752C31.1060242 9.89628016 30.9669548 9.87889648 30.8361633 9.87889648 30.4702783 9.87889648 30.0779038 10.0792227 29.7906592 10.4451077zM24.8164436 11.4815061C24.8859783 12.1437415 25.4083165 12.596545 26.1400866 12.596545 26.540739 12.596545 26.9852645 12.4483698 27.4380679 12.1867868L27.4380679 13.1197109C26.9413914 13.3456988 26.4447149 13.4591066 25.957144 13.4591066 24.641779 13.4591066 23.7187884 12.5005208 23.7187884 11.1421105 23.7187884 9.82674545 24.6243953 8.89464913 25.8702257 8.89464913 27.0109261 8.89464913 27.7865693 9.79197809 27.7865693 11.071748 27.7865693 11.1942615 27.7865693 11.333331 27.7691856 11.4815061L24.8164436 11.4815061zM25.8263526 9.75638294C25.2866307 9.75638294 24.8685946 10.1578631 24.8164436 10.7588418L26.7154036 10.7588418C26.6806362 10.1661411 26.3230291 9.75638294 25.8263526 9.75638294zM20.9216717 13.3548045L20.0326207 10.3929567 19.1526754 13.3548045 18.1510443 13.3548045 16.6527368 8.9989512 17.7677756 8.9989512 18.6477209 11.960799 19.5276662 8.9989512 20.5375751 8.9989512 21.4175204 11.960799 22.2974657 8.9989512 23.4125045 8.9989512 21.9233027 13.3548045 20.9216717 13.3548045zM14.1080973 13.4591066C12.7927322 13.4591066 11.8606359 12.5096266 11.8606359 11.1768779 11.8606359 9.83502339 12.7927322 8.89464913 14.1080973 8.89464913 15.4234623 8.89464913 16.3472807 9.83502339 16.3472807 11.1768779 16.3472807 12.5096266 15.4234623 13.4591066 14.1080973 13.4591066zM14.1080973 9.82674545C13.4549676 9.82674545 13.0021642 10.375573 13.0021642 11.1768779 13.0021642 11.9781827 13.4549676 12.5270103 14.1080973 12.5270103 14.752949 12.5270103 15.2057524 11.9781827 15.2057524 11.1768779 15.2057524 10.375573 14.752949 9.82674545 14.1080973 9.82674545zM9.21169432 11.2025395L8.21006329 11.2025395 8.21006329 13.3548045 7.09502445 13.3548045 7.09502445 7.3607464 9.21169432 7.3607464C10.431863 7.3607464 11.3027026 8.15377328 11.3027026 9.28619581 11.3027026 10.4186183 10.431863 11.2025395 9.21169432 11.2025395zM9.05524121 8.26718109L8.21006329 8.26718109 8.21006329 10.2969326 9.05524121 10.2969326C9.70009293 10.2969326 10.1528964 9.88717443 10.1528964 9.28619581 10.1528964 8.67693924 9.70009293 8.26718109 9.05524121 8.26718109zM91.981185 11.6313369L87.3794768 11.6313369C87.4846067 12.733131 88.2917061 13.0576264 89.2080743 13.0576264 90.1409984 13.0576264 90.8760797 12.8606113 91.5167924 12.5377716L91.5167924 14.430937C90.8785631 14.785233 90.0350407 15.0401936 88.9117239 15.0401936 86.6220451 15.0401936 85.0177798 13.606454 85.0177798 10.7720865 85.0177798 8.37810552 86.3786736 6.47748994 88.6145458 6.47748994 90.8471069 6.47748994 92.0126412 8.37727773 92.0126412 10.7845034 92.0126412 11.0121468 91.9919463 11.5046844 91.981185 11.6313369zM88.5996455 8.39383361C88.0119116 8.39383361 87.3587819 8.83753133 87.3587819 9.89628016L89.7891858 9.89628016C89.7891858 8.83835912 89.1766181 8.39383361 88.5996455 8.39383361zM81.2132375 15.0401936C80.39041 15.0401936 79.8879389 14.6933478 79.5501989 14.4458373L79.5452321 17.1055402 77.1951242 17.6055279 77.1942964 6.63394306 79.2637821 6.63394306 79.3862956 7.21422682C79.7107909 6.91125413 80.305975 6.47748994 81.22731 6.47748994 82.8779317 6.47748994 84.4325293 7.9642084 84.4325293 10.7008962 84.4325293 13.6875778 82.8944876 15.0401936 81.2132375 15.0401936zM80.6652377 8.55939246C80.1263437 8.55939246 79.7877758 8.75640749 79.5427487 9.02544062L79.5568212 12.5179045C79.7852924 12.765415 80.1139267 12.9640856 80.6652377 12.9640856 81.5344217 12.9640856 82.1171888 12.0179168 82.1171888 10.7522194 82.1171888 9.52294496 81.5253159 8.55939246 80.6652377 8.55939246zM73.7970289 6.63394306L76.1562425 6.63394306 76.1562425 14.8721514 73.7970289 14.8721514 73.7970289 6.63394306zM73.7970289 4.00321295L76.1562425 3.50156964 76.1562425 5.41625773 73.7970289 5.91790104 73.7970289 4.00321295zM71.2813622 9.2870236L71.2813622 14.8721514 68.9320821 14.8721514 68.9320821 6.63394306 70.964317 6.63394306 71.1116644 7.32846242C71.6621475 6.31689786 72.7606305 6.52219083 73.0735367 6.63477085L73.0735367 8.79531382C72.774703 8.69846189 71.8368121 8.55773687 71.2813622 9.2870236zM66.2434064 11.9823217C66.2434064 13.3672214 67.7268137 12.9359406 68.027303 12.8159105L68.027303 14.7289429C67.7143968 14.9011242 67.1465299 15.0401936 66.3783369 15.0401936 64.9835036 15.0401936 63.9363439 14.0129009 63.9363439 12.6213788L63.9471052 5.08100106 66.2417508 4.59260245 66.2434064 6.63394306 68.0281308 6.63394306 68.0281308 8.63803292 66.2434064 8.63803292 66.2434064 11.9823217zM63.3138426 12.3829741C63.3138426 14.0749855 61.9670214 15.0401936 60.0125992 15.0401936 59.2021886 15.0401936 58.3164488 14.8829127 57.442298 14.5070941L57.442298 12.2629439C58.231186 12.6917413 59.2361282 13.0137533 60.0150825 13.0137533 60.5390763 13.0137533 60.9165505 12.8730283 60.9165505 12.4384363 60.9165505 11.3167751 57.3437905 11.7389501 57.3437905 9.13719284 57.3437905 7.47332642 58.6144547 6.47748994 60.5208648 6.47748994 61.2998192 6.47748994 62.0779458 6.59669231 62.8569002 6.90711516L62.8569002 9.12146475C62.141686 8.73488484 61.2335957 8.51634716 60.5192092 8.51634716 60.0266717 8.51634716 59.7203878 8.65872777 59.7203878 9.02544062 59.7203878 10.0833617 63.3138426 9.58006276 63.3138426 12.3829741z"></path>
                          </g>
                        </svg>
                    </div>

                    <Stripe form="donate" />
                </div>
                <Footer />
            </div>
        </div>
    );
};

async function getData(config) {
    if (!config) { config = {}; }
    console.log('config get data after load', config)
    let content = await getContent({type: 'content', uid: 'donate', ref_id: config.preview || ''});
    return content.content
}

export async function getStaticProps(context) {

    let content = await getData(context);

    return {
        props: {
            content: content
        },
    };
}
