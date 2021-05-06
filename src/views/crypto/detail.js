import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import ct_punk from 'data/data';
import _ from 'lodash';
const Container = tw.div`relative mx-5`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-2 md:py-3`;
const Grid = tw.div`grid grid-cols-3 px-5`;
const GridCol = tw.div`py-5`;
const GoToSearch = tw.b`cursor-pointer`;

const CryptoDetail = (props) => {
    const params = useParams();
    const [punk,setPunk] = useState({});
    const history = useHistory();
    useEffect(()=>{
        ct_punk.map((cell)=>{
            if(cell.id ==params.crypto_id){
                setPunk(cell);
            }
        })
    },[])
    const handleGoSearch = (link) => {
        history.push(`/cryptopunks/search?query=${link}`);
    }
    const name_funciton = (props) => {
        console.log(props)
    }
    return(
    <>
        <div style={{background:'grey'}} onClick={()=>name_funciton('dfsdfs')}>
            <img src={`/images/${punk.src}`} style={{height:'500px',margin:'auto',imageRendering: 'pixelated'}}/>
        </div>
        <Container>
            <TwoColumn>
                <h2>crypto punk</h2>
            </TwoColumn>
            <TwoColumn>
                <h2>One of <GoToSearch onClick={()=>handleGoSearch(punk.type)} >{punk.type}</GoToSearch> Punks.</h2>
            </TwoColumn>
            <TwoColumn>
                <h2>Accesories</h2>
            </TwoColumn>
            <Grid>
                {punk.attr?punk.attr.map((attr)=>{
                    let attr_punks= _.filter(ct_punk,function(punk){
                        if(punk.attr.indexOf(attr)!==-1){
                            return punk;
                        };
                    })
                    return (
                    <GridCol>
                        <GoToSearch onClick={()=>handleGoSearch(attr)} >{attr}</GoToSearch>
                        <br/>
                        {attr_punks.length} Punks have this.
                    </GridCol>)
                }):''}
            </Grid>
        </Container>
    </>)
}
export default CryptoDetail;