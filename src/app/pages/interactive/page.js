"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';
import Header from "../../components/Header";

import Chart from 'chart.js/auto';
import Modal from 'react-modal';

import AnimalChart from '../../components/AnimalChart';

export default function Interactive() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [regions, setRegions] = useState([
    {
      id: 1,
      name: "Semonggoh Wildlife Park",
      positions: [
        [1.418991652472288, 110.30704095871451],
        [1.4196783286257997, 110.29966230881367],
        [1.4133265664365962, 110.29863272975778],
        [1.4105798530776525, 110.29846113324844],
        [1.409549834731779, 110.29554399258997],
        [1.4073181267530879, 110.29708836117388],
        [1.4054297567952703, 110.29657357164591],
        [1.4047430764319255, 110.29846113324844],
        [1.4037130555085306, 110.29725995768318],
        [1.3928978084816899, 110.29674516815523],
        [1.389807728768143, 110.29623037862726],
        [1.3906660846500836, 110.2917688693849],
        [1.3908377557890175, 110.28988130778238],
        [1.3925544664912424, 110.28936651825443],
        [1.3930694794581482, 110.28988130778238],
        [1.3953012010133423, 110.28953811476376],
        [1.3958162133793526, 110.28885172872646],
        [1.397017908461351, 110.28885172872646],
        [1.3977045910893906, 110.29056769381964],
        [1.3977045910893906, 110.2917688693849],
        [1.3968462377729745, 110.29399962400608],
        [1.400451319592609, 110.29382802749676],
        [1.4025113638577908, 110.29297004495014],
        [1.404228066026982, 110.29451441353405],
        [1.404228066026982, 110.29520079957135],
        [1.4056014268545585, 110.2958871856086],
        [1.4080048063587356, 110.29554399258997],
        [1.4078331364762988, 110.29468601004338],
        [1.4088631555813833, 110.29228365891285],
        [1.4086914857621253, 110.29142567636625],
        [1.4073181267530879, 110.29005290429173],
        [1.4074897966734623, 110.28799374617985],
        [1.4061164369567134, 110.28576299155867],
        [1.4061164369567134, 110.28421862297478],
        [1.404914746541683, 110.28250265788154],
        [1.4019963529614132, 110.2819878683536],
        [1.403026374640839, 110.2843902194841],
        [1.4009663308287588, 110.2843902194841],
        [1.3999363082432694, 110.28387542995613],
        [1.398562944092064, 110.28284585090019],
        [1.3953012010133423, 110.28233106137222],
        [1.3940995050542107, 110.28164467533495],
        [1.3954728718145395, 110.27769795562057],
        [1.3937561632389226, 110.27615358703669],
        [1.3911810980294312, 110.2770115695833],
        [1.3913527691308982, 110.28130148231632],
        [1.389979399969492, 110.28181627184426],
        [1.3894643863280034, 110.27958551722313],
        [1.3896360575543134, 110.27666837656466],
        [1.3913527691308982, 110.27409442892481],
        [1.3927261374927127, 110.27426602543413],
        [1.3942711759430766, 110.27255006034098],
        [1.3939278341528132, 110.27100569175707],
        [1.3910094269154838, 110.27357963939686],
        [1.3874043306395665, 110.27375123590616],
        [1.3832842138836245, 110.27289325335957],
        [1.3747006143550395, 110.27066249873842],
        [1.3771040253419498, 110.26791695458928],
        [1.3762456645532146, 110.26688737553334],
        [1.371610510960342, 110.26860334062657],
        [1.3698937851273534, 110.27066249873842],
        [1.3680053852904128, 110.27306484986889],
        [1.3664603297727345, 110.27752635911126],
        [1.3633702157569563, 110.28027190326041],
        [1.361481810794132, 110.28250265788154],
        [1.3565032815341829, 110.28627778108662],
        [1.3546148712021115, 110.29091088683829],
        [1.3561599343106416, 110.29194046589421],
        [1.3587350372990414, 110.29194046589421],
        [1.357876669940998, 110.29365643098744],
        [1.359765077726043, 110.29760315070185],
        [1.361481810794132, 110.2982895367391],
        [1.3630268695102015, 110.29554399258997],
        [1.3652586192384946, 110.29451441353405],
        [1.3693787671375248, 110.29605878211794],
        [1.3697221124763712, 110.30000550183229],
        [1.3700654577660207, 110.30189306343483],
        [1.3692070944496608, 110.3061829761679],
        [1.3673186940719877, 110.30875692380768],
        [1.3671470212366859, 110.31270364352208],
        [1.3681770580643045, 110.31630717021781],
        [1.3697221124763712, 110.3171651527644],
        [1.3705804756082463, 110.3151059946526],
        [1.371953855979199, 110.31544918767122],
        [1.372468873415077, 110.31939590738558],
        [1.372983890740068, 110.32282783757204],
        [1.374528942049071, 110.32248464455338],
        [1.3747006143550395, 110.32488699568388],
        [1.3734989079540831, 110.32643136426773],
        [1.3748722866486802, 110.32660296077707],
        [1.3759023201511944, 110.32368582011864],
        [1.3757306479316607, 110.3217982585161],
        [1.374528942049071, 110.32025388993222],
        [1.375387303455508, 110.31905271436695],
        [1.377275697462619, 110.31870952134831],
        [1.378305729926822, 110.3151059946526],
        [1.3815674964559006, 110.31253204701275],
        [1.3824258553249165, 110.31304683654072],
        [1.384314243744162, 110.3151059946526],
        [1.3836275572201717, 110.31973910040425],
        [1.3850009300692656, 110.32196985502542],
        [1.386202630659374, 110.32214145153475],
        [1.3863743021224701, 110.32076867946016],
        [1.3858592876958422, 110.31750834578304],
        [1.3874043306395665, 110.31785153880169],
        [1.3892927150892254, 110.32042548644151],
        [1.3892927150892254, 110.32299943408135],
        [1.3911810980294312, 110.32385741662794],
        [1.3942711759430766, 110.32454380266525],
        [1.397532920451203, 110.3242006096466],
        [1.401138001215644, 110.32488699568388],
        [1.4033697150998874, 110.32385741662794],
        [1.4068031169161404, 110.32265624106272],
        [1.409549834731779, 110.32231304804407],
        [1.411438201350943, 110.32196985502542],
        [1.413841574829928, 110.32162666200678],
        [1.4150432606366148, 110.32454380266525],
        [1.4159016072602533, 110.32591657473978],
        [1.4177899687132043, 110.3242006096466],
        [1.418991652472288, 110.32282783757204],
        [1.4201933356070797, 110.32368582011864],
        [1.4213950181169943, 110.32162666200678],
        [1.4222533623841092, 110.31888111785763],
        [1.422081693556217, 110.31665036323643],
        [1.4191633215298034, 110.31596397719919],
        [1.4188199834020632, 110.3144196086153],
        [1.4165882843303501, 110.31476280163395],
        [1.415386599324209, 110.31459120512463],
        [1.4152149299867538, 110.31321843305005],
        [1.415558268648929, 110.31133087144751],
        [1.417274961196904, 110.31081608191954],
        [1.4195066596065529, 110.30944330984495]
      ]
    }
  ]);

  const [animalDetections, setAnimalDetections] = useState([]);
  const [nextAnimalType, setNextAnimalType] = useState('orangutan');
  const [currentAnimalType, setCurrentAnimalType] = useState('orangutan');
  const [animalInfo, setAnimalInfo] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Simulate classification
    const dummyPrediction = 'Bearded Pig';
    setPrediction(dummyPrediction);
    setIsModalOpen(true);
  };
    const isPointInPolygon = (point, polygon) => {
      let x = point[0], y = point[1];
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];
        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    const calculateDistance = (point1, point2) => {
      const [lat1, lon1] = point1;
      const [lat2, lon2] = point2;
      const R = 6371e3; // metres
      const φ1 = lat1 * Math.PI/180; // φ, λ in radians
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      const distance = R * c; // in metres
      return distance;
    };

    const simulateAnimalDetection = () => {
      const region = regions[0]; // Assuming only one region for simplicity
      let newDetection;
      const minDistance = 500; // Minimum distance between detections
      do {
        newDetection = {
          id: animalDetections.length + 1,
          position: [
            1.388991652472288 + Math.random() * 0.01,
            110.29704095871451 + Math.random() * 0.01
          ],
          name: nextAnimalType === 'orangutan' 
            ? `<div style="text-align: center;">
            <h3>Orangutan</h3>
            <img src="https://cdn.strateticsxp.com/wildlife/orangutan-real.jpg" alt="Orangutan" style="width: 80%; height: auto;" />
            <p><strong>Statistics:</strong></p>
            <ul>
              <li>Average Height: 1.2-1.5m</li>
              <li>Average Weight: 30-90kg</li>
            </ul>
            <p><strong>Fun Fact:</strong></p>
            <p>Orangutans are the largest arboreal mammals, spending most of their time in trees.</p>
          </div>`
        : `<div style="text-align: center;">
            <h3>Bearded Pig</h3>
            <img src="https://cdn.strateticsxp.com/wildlife/boar-real.jpeg" alt="Bearded Pig" style="width: 80%; height: auto;" />
            <p><strong>Statistics:</strong></p>
            <ul>
              <li>Average Height: 0.55-1.1m</li>
              <li>Average Weight: 50-90kg</li>
            </ul>
            <p><strong>Fun Fact:</strong></p>
            <p>Bearded pigs are known for their distinctive facial hair and are excellent swimmers, often crossing rivers and even swimming between islands.</p>
          </div>`,
          type: nextAnimalType
        };
      } while (
        !isPointInPolygon(newDetection.position, region.positions) ||
        animalDetections.some(detection => calculateDistance(detection.position, newDetection.position) < minDistance)
      );
      setAnimalDetections([...animalDetections, newDetection]);
      setCurrentAnimalType(nextAnimalType);
      setNextAnimalType(nextAnimalType === 'orangutan' ? 'bearded pig' : 'orangutan');
      setAnimalInfo(newDetection.name);
    };  

    const orangutanIcon = new Icon ({
      iconUrl: "https://cdn.strateticsxp.com/wildlife/orangutan.png",
      iconSize: [50, 50], // size of the icon
      iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

    const boarIcon = new Icon ({
      iconUrl: "https://cdn.strateticsxp.com/wildlife/boar.png",
      iconSize: [32, 32], // size of the icon
      iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />

      <h1 className="text-3xl font-bold text-center my-4">Interactive Map & Image Classification</h1>

      <div className="flex justify-center items-center py-10 bg-gray-200">
        <button onClick={simulateAnimalDetection} className="w-full max-w-md p-2 bg-green-500 text-white rounded-md">Simulate Animal Detection</button>
      </div>

      {/* Interactive map for visualization of wildlife in Borneo */}
      <div className="flex-grow flex justify-center items-center mt-2 z-0">
        <MapContainer center={[1.388991652472288, 110.29704095871451]} zoom={14} style={{ height: "76vh", width: "80%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {regions.map(region => (
            <Polygon key={region.id} positions={region.positions}>
              <Popup>{region.name}</Popup>
            </Polygon>
          ))}
          {animalDetections.map(detection => (
            <Marker key={detection.id} 
                position={detection.position} 
                icon={detection.type === 'orangutan' ? orangutanIcon : boarIcon}>
              <Popup>
                <div dangerouslySetInnerHTML={{ __html: detection.name }} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Image input for classifying species */}
      <div className="flex justify-center items-center py-10 bg-gray-200">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Image for Classification</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" className="w-full p-2 border border-gray-300 rounded-md mb-4" onChange={handleFileChange} />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Classify</button>
          </form>
          {prediction && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md">
              <p>Prediction: {prediction}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for displaying animal information */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Animal Information"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Animal Information</h2>
        <div className="text-center flex flex-col justify-center items-center">
          <div dangerouslySetInnerHTML={{ __html: animalInfo }} />
          
          <AnimalChart animalType={currentAnimalType} />
        </div>
        <button onClick={() => setIsModalOpen(false)} className="w-full p-2 bg-red-500 text-white rounded-md mt-4">Close</button>
      </Modal>
      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 1000;
        }
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          z-index: 1001;
        }
      `}</style>
    </div>
  );
}