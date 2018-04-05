cd /tmp
wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz
wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.tar.gz
wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-ASN.tar.gz

tar xf GeoLite2-City.tar.gz
tar xf GeoLite2-Country.tar.gz
tar xf GeoLite2-ASN.tar.gz

cp GeoLite2-ASN_*/GeoLite2-ASN.mmdb $OLDPWD/data/
cp GeoLite2-Country_*/GeoLite2-Country.mmdb $OLDPWD/data/
cp GeoLite2-City_*/GeoLite2-City.mmdb $OLDPWD/data/

rm -r GeoLite2-ASN*
rm -r GeoLite2-Country*
rm -r GeoLite2-City*


cd -
