$(document).ready(async () => {
    const hawkRes = await fetch('http://localhost:3000/proxy');
    const hawkJson = await hawkRes.json();

    const loopData = (data) => {
        console.log(data['linesOfBusiness'][0]['drivers']);
        $('#policy-number').html(data.id);
        $('#policy-table').append(`<tr><td>Application Type</td><td>${data['applicationType']}</td></tr>`);
        $('#policy-table').append(`<tr><td>Type</td><td>${data['type']}</td></tr>`);
        $('#policy-table').append(`<tr><td>Current Carrier</td><td>${data['carrier']}</td></tr>`);
        $('#policy-table').append(`<tr><td>State</td><td>${data['state']}</td></tr>`);
        $('#policy-table').append(`<tr><td>Effective Date</td><td>${data['effectiveDate']}</td></tr>`);
        $('#policy-table').append(`<tr><td>Expiration Date</td><td>${data['expirationDate']}</td></tr>`);

        loopDriver(data['linesOfBusiness'][0]['drivers']);
        loopVehicle(data['linesOfBusiness'][0]['vehicles'])
        // for(const x in data) {
        //     if(data[x].length > 0 && typeof(data[x]) === 'string') {
        //         let arr = x.split(/(?=[A-Z])/);
        //         let first = arr[0].split('')
        //         first[0] = first[0].toUpperCase();
        //         arr[0] = first.join('');

        //         $('#policy-table').append(`<tr><td>${arr.join(' ')}</td><td>${data[x]}</td></tr>`);
        //     } else if(x === 'linesOfBusiness') {
        //         const lob = data[x][0];
        //         for(const y in lob) {
        //             if(y === 'drivers') {
        //                 loopDriver(lob[y]);
        //             } else if(y === 'vehicles') {
        //                 loopVehicle(lob[y]);
        //             }
        //         }
        //     }
        // }
    }

    const camelCase = (string) => {
        let arr = string.split(/(?=[A-Z])/);
        let first = arr[0].split('')
        first[0] = first[0].toUpperCase();
        arr[0] = first.join('')
    }

    const loopDriver = (inner) => {
        for(let i = 0; i < inner.length; i++) {
            $('#driver-table').append(`<tr><td>${i+1}</td><td>${inner[i].firstName} ${inner[i].lastName}</td><td>${inner[i].dateOfBirth}</td><td>${inner[i].relationship}</td></tr>`);
        }
    }

    const loopVehicle = (inner) => {
        for(let i = 0; i < inner.length; i++) {
            $('#vehicle-table').append(`<tr><td>${i+1}</td><td>${inner[i].year}</td><td>${inner[i].make}</td><td>${inner[i].model}</td></tr>`);
            let covs = {
                'COLL': '',
                'COMP': '',
                'TOW': '',
                'RREIM': ''
            }
            for(let k = 0; k < inner[i].coverages.length; k++) {
                if(covs[inner[i].coverages[k].code] !== undefined) {
                    covs[inner[i].coverages[k].code] = inner[i].coverages[k].deductibles
                }
            }

            $('#vehicle-cov-table').append(`<tr><td>${inner[i].year} ${inner[i].make} ${inner[i].model}</td><td>${covs['COMP']}</td><td>${covs['COLL']}</td><td>${covs['TOW']}</td><td>${covs['RREIM']}</td></tr>`);
        }
    }

    loopData(hawkJson[0]);
});