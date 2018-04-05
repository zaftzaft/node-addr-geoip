'use strict';

const path = require("path");
const maxmind = require("maxmind");

const promisify = db => {
  return new Promise((resolv, reject) => {
    maxmind.open(db, (err, func) => {
      if(err) {
        reject(err);
      }
      resolv(func);
    });
  });
};


Promise.all([
  //promisify("./data/GeoLite2-Country.mmdb"),
  promisify(path.join(__dirname, "./data/GeoLite2-City.mmdb")),
  promisify(path.join(__dirname, "./data/GeoLite2-ASN.mmdb"))
])
.then(res => {
  //const countryLookup = res[0];
  const cityLookup = res[0];
  const asnLookup = res[1];

  for(let i = 2;i < process.argv.length;i++) {
    let addr = process.argv[i];

    const city = cityLookup.get(addr);
    const asn = asnLookup.get(addr);

    if(!city) {
      return null;
    }

    console.log(JSON.stringify({
      address: addr,
      city: city.city ? city.city.names.en : null,
      country: city.country ? city.country.names.en : null,
      country_code: city.country ? city.country.iso_code : null,
      location: `${city.location.latitude},${city.location.longitude}`,
  //    location: {
  //      lat: city.location.latitude,
  //      lon: city.location.longitude
  //    },
      as: asn.autonomous_system_number,
      as_org: asn.autonomous_system_organization,
      "@timestamp": (new Date).toISOString()
    }));
  }

})
.catch(e => {
  console.error(e.stack);
  process.exit(1);
});



