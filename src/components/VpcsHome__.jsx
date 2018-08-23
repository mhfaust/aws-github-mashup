import React from 'react';
import { vpcNames } from '../../common';
import { Funko } from '~/components';

class VpcsHome__ extends React.Component{

    render(){ 
        
        let N = 70;
        let logBase=8;
        let nums = new Array(N), i;
        for(i = 0;i < N; i++){
            nums[i]=i;
        }
        //I had to find some way of working Fisher-Yates into this project:
        for(i = 0; i < N; i++){
            let t = nums[i];
            let p = Math.floor(Math.random() * (N - i)) + i;
            nums[i] = nums[p];
            nums[p] = t;
        }
        let numFunkos = vpcNames.funkos.length;

        return (
            <main style={{position:'relative'}}>
                {nums.map((n,i) => {
                    let size = 50 * logBase / ( Math.pow(logBase , n / N) )
                    let x = Math.random() * 100;
                    let y = Math.random() * 100;
                    return (
            
                      <Funko 
                            key={i} 
                            size={size} 
                            name={vpcNames.funkos[i % numFunkos]}
                            style={{
                                zIndex:Math.floor(size),
                                position:'absolute',
                                top:`calc(${y}vh - ${size/2}px)`,
                                left:`calc(${x}vw - ${size/2}px)`
                            }}>
                        </Funko>  
            
                )})}        
            </main>       
    )}
}

export default VpcsHome__;
