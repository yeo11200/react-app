import useSWR from "swr";




const Main = () => {

    let test = useSWR('test');
    
    console.log(test);
    
    return(
        <div>
            메인페이지
        </div>
    )
}

 
export default Main;