const mongoose = require('mongoose');
const Place = require('../models/place');

mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then((result) => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.log(err)
    });

async function seedPlaces() {
    const places = [
        {
            title: 'Taman Mini Indonesia Indah',
            price: 20000,
            description: 'Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia',
            location: 'Taman Mini Indonesia Indah, Jakarta',
            image: 'https://via.placeholder.com/1280x720?text=Taman+Mini+Indonesia+Indah'
        },
        {
            title: 'Pantai Kuta',
            price: 0,
            description: 'Pantai yang terkenal di Bali dengan pemandangan sunset yang indah',
            location: 'Pantai Kuta, Kuta, Badung Regency, Bali',
            image: 'https://via.placeholder.com/1280x720?text=Pantai+Kuta'
        },
        {
            title: 'Borobudur',
            price: 0,
            description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
            location: 'Borobudur, Magelang, Central Java',
            image: 'https://via.placeholder.com/1280x720?text=Borobudur'
        },
        {
            title: 'Kawah Putih',
            price: 0,
            description: 'Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat',
            location: 'Kawah Putih, Ciwidey, West Java',
            image: 'https://via.placeholder.com/1280x720?text=Kawah+Putih'
        },
        {
            title: 'Malioboro',
            price: 0,
            description: 'Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas',
            location: 'Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta',
            image: 'https://via.placeholder.com/1280x720?text=Malioboro'
        },
        {
            title: 'Pantai Tanjung Aan',
            price: 10000,
            description: 'Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat',
            location: 'Pantai Tanjung Aan, Lombok, West Nusa Tenggara',
            image: 'https://via.placeholder.com/1280x720?text=Pantai+Tanjung+Aan'
        },
        {
            title: 'Bukit Bintang',
            price: 0,
            description: 'Kawasan perbelanjaan dan hiburan di Kuala Lumpur, Malaysia',
            location: 'Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
            image: 'https://via.placeholder.com/1280x720?text=Bukit+Bintang'
        },
        {
            title: 'Candi Prambanan',
            price: 25000,
            description: 'Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta',
            location: 'Candi Prambanan, Sleman, Special Region of Yogyakarta',
            image: 'https://via.placeholder.com/1280x720?text=Candi+Prambanan'
        },
        {
            title: 'Danau Toba',
            price: 0,
            description: 'Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara',
            location: 'Danau Toba, North Sumatra',
            image: 'https://via.placeholder.com/1280x720?text=Danau+Toba'
        },
        {
            title: 'Kawah Ijen',
            price: 100000,
            description: 'Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur',
            location: 'Kawah Ijen, Banyuwangi, East Java',
            image: 'https://via.placeholder.com/1280x720?text=Kawah+Ijen'
        },
        {
            title: 'Pantai Sanur',
            price: 0,
            description: 'Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit',
            location: 'Pantai Sanur, Denpasar, Bali',
            image: 'https://via.placeholder.com/1280x720?text=Pantai+Sanur'
        },
        {
            title: 'Candi Borobudur',
            price: 25000,
            description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
            location: 'Candi Borobudur, Borobudur, Magelang, Central Java',
            image: 'https://via.placeholder.com/1280x720?text=Candi+Borobudur'
        },
        {
            title: 'Pulau Komodo',
            price: 5000000,
            description: 'Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia',
            location: 'Pulau Komodo, East Nusa Tenggara',
            image: 'https://via.placeholder.com/1280x720?text=Pulau+Komodo'
        },
        {
            title: 'Taman Nasional Gunung Rinjani',
            price: 150000,
            description: 'Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia',
            location: 'Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara',
            image: 'https://via.placeholder.com/1280x720?text=Taman+Nasional+Gunung+Rinjani'
        },
        {
            title: 'Bukit Tinggi',
            price: 0,
            description: 'Kota kecil yang terletak di Sumatera Barat dengan arsitektur khas Eropa',
            location: 'Bukit Tinggi, West Sumatra',
            image: 'https://via.placeholder.com/1280x720?text=Bukit+Tinggi'
        },
        {
            title: 'Pulau Weh',
            price: 0,
            description: 'Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa',
            location: 'Pulau Weh, Sabang, Aceh',
            image: 'https://via.placeholder.com/1280x720?text=Pulau+Weh'
        },
        {
            title: 'Taman Safari Indonesia',
            price: 0,
            description: 'Taman hiburan keluarga dengan berbagai satwa liar di Cisarua, Bogor',
            location: 'Taman Safari Indonesia, Cisarua, West Java',
            image: 'https://via.placeholder.com/1280x720?text=Taman+Safari+Indonesia'
        },
        {
            title: 'Gunung Merbabu',
            price: 50000,
            description: 'Gunung yang terletak di Jawa Tengah dengan pemandangan matahari terbit yang indah',
            location: 'Gunung Merbabu, Central Java',
            image: 'https://via.placeholder.com/1280x720?text=Gunung+Merbabu'
        },
        {
            title: 'Pulau Lombok',
            price: 0,
            description: 'Pulau di Indonesia yang terkenal dengan keindahan pantainya',
            location: 'Pulau Lombok, West Nusa Tenggara',
            image: 'https://via.placeholder.com/1280x720?text=Pulau+Lombok'
        },
        {
            title: 'Tanjung Lesung',
            price: 100000,
            description: 'Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang',
            location: 'Tanjung Lesung, Pandeglang, Banten',
            image: 'https://via.placeholder.com/1280x720?text=Tanjung+Lesung'
        }
    ]
    

    try {
        const newPlace = await Promise.all(places.map(async place => {
            let geoData = await geometry(place.location)
            if (!geoData) {
                geoData = { type: 'Point', coordinates: [116.32883, -8.90952] }
            }
            return {
                ...place, author: '643d0c066dd99b1f6d6d6ad3',
                images: {
                    url: 'public\\images\\image-1681876521153-260851838.jpg',
                    filename: 'image-1681876521153-260851838.jpg'
                },
                geometry: geoData
            }
        }))
        
        await Place.deleteMany({});
        await Place.insertMany(newPlace);
        console.log('Data berhasil disimpan');
    } catch (err) {
        console.log('Terjadi kesalahan saat menyimpan data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedPlaces();