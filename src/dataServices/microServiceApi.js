const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'cache-control': 'no-cache'
};


export default {

    getHttpStatus: (apiUrlSegment, vpcName, timeoutMs) => {

        return new Promise((resolve, reject) => {

            let resolveAs502 = () => resolve({ apiUrlSegment, vpcName, status: 502 });

            setTimeout(resolveAs502, timeoutMs);
            
            let fingerprint = `${vpcName}-${apiUrlSegment}-${Date.now()}`;
            return fetch(`https://${apiUrlSegment}-api.${vpcName}.sw-dev.net/HealthCheck?t=${fingerprint}`,{
                jsonHeaders,
                method: 'options'
            })
            .catch(resolveAs502)           
            .then(response => { 
              let status = response ? response.status : 502;
              resolve({ apiUrlSegment, vpcName, status });
            })
        });
    }
}