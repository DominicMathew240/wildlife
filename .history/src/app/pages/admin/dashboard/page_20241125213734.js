"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from "../components/sidebar";
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '7847311827:AAFzrC4rpUb5A3owFNk4eKLKsXf9IRXQM9Y';
const TELEGRAM_CHAT_ID = '-1002157320382';

// Full camera trap site data from CSV
const cameraTrapSites = [
    {site_name: "0002-A", coordinate_x: 506314, coordinate_y: 17234, elevation_m: 279, forestCover_: 95},
    {site_name: "0002-B", coordinate_x: 516314, coordinate_y: 160293, elevation_m: 308, forestCover_: 97},
    {site_name: "0002-C", coordinate_x: 516300, coordinate_y: 183558, elevation_m: 374, forestCover_: 93},
    {site_name: "0002-D", coordinate_x: 576300, coordinate_y: 179063, elevation_m: 382, forestCover_: 97},
    {site_name: "0002-E", coordinate_x: 506300, coordinate_y: 179349, elevation_m: 471, forestCover_: 93},
    {site_name: "0002-F", coordinate_x: 536300, coordinate_y: 177877, elevation_m: 336, forestCover_: 98},
    {site_name: "0002-G", coordinate_x: 536300, coordinate_y: 178106, elevation_m: 453, forestCover_: 91},
    {site_name: "0002-H", coordinate_x: 556300, coordinate_y: 176788, elevation_m: 356, forestCover_: 97},
    {site_name: "0002-I", coordinate_x: 436300, coordinate_y: 176590, elevation_m: 531, forestCover_: 91},
    {site_name: "0003-A", coordinate_x: 496224, coordinate_y: 175612, elevation_m: 337, forestCover_: 98},
    {site_name: "0003-B", coordinate_x: 496143, coordinate_y: 174576, elevation_m: 337, forestCover_: 98},
    {site_name: "0003-C", coordinate_x: 408306, coordinate_y: 177608, elevation_m: 558, forestCover_: 95},
    {site_name: "0004-A", coordinate_x: 115275, coordinate_y: 175778, elevation_m: 439, forestCover_: 98},
    {site_name: "0004-B", coordinate_x: 113813, coordinate_y: 174554, elevation_m: 297, forestCover_: 98},
    {site_name: "0004-C", coordinate_x: 155300, coordinate_y: 213262, elevation_m: 648, forestCover_: 94},
    {site_name: "0005-A", coordinate_x: 262944, coordinate_y: 212270, elevation_m: 667, forestCover_: 98},
    {site_name: "0005-B", coordinate_x: 262021, coordinate_y: 211631, elevation_m: 667, forestCover_: 98},
    {site_name: "0005-C", coordinate_x: 264004, coordinate_y: 143999, elevation_m: 15, forestCover_: 92},
    {site_name: "0006-A", coordinate_x: 261010, coordinate_y: 138989, elevation_m: 104, forestCover_: 89},
    {site_name: "0006-B", coordinate_x: 263049, coordinate_y: 139042, elevation_m: 549, forestCover_: 94}
];

// Function to convert local coordinates to approximate lat/long
const convertToLatLong = (x, y) => {
    // Find the bounds of your coordinate system
    const minX = Math.min(...cameraTrapSites.map(site => site.coordinate_x));
    const maxX = Math.max(...cameraTrapSites.map(site => site.coordinate_x));
    const minY = Math.min(...cameraTrapSites.map(site => site.coordinate_y));
    const maxY = Math.max(...cameraTrapSites.map(site => site.coordinate_y));

    // Calculate the coordinate ranges
    const xRange = maxX - minX;
    const yRange = maxY - minY;

    // Define the bounds of your map area (Semenggoh Wildlife Park)
    const mapBounds = {
        minLat: 1.3633702157569563,
        maxLat: 1.4222533623841092,
        minLong: 110.26688737553334,
        maxLong: 110.32660296077707
    };

    // Convert to lat/long
    const lat = mapBounds.minLat + ((y - minY) / yRange) * (mapBounds.maxLat - mapBounds.minLat);
    const long = mapBounds.minLong + ((x - minX) / xRange) * (mapBounds.maxLong - mapBounds.minLong);

    return [lat, long];
};

export default function Dashboard() {
    const [mapCenter, setMapCenter] = useState([1.3845043763517921, 110.29892039383745]);
    const [zoomLevel, setZoomLevel] = useState(13);
    const [pinpoints, setPinpoints] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);

    const [regions, setRegions] = useState([
        { id: 1, name: "Semonggoh Wildlife Park", positions: [
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
        ]},
    ]);

    const secondRegion = [
        [1.4052580867233615, 110.31218885399413],
        [1.4104081833849933, 110.30978650286362],
        [1.4116098709675744, 110.30292264249076],
        [1.4100648439616859, 110.30189306343483],
        [1.4035413853105065, 110.3015498704162],
        [1.396502896358589, 110.29983390532297],
        [1.3908377557890175, 110.29863272975778],
        [1.3877476733789456, 110.29725995768318],
        [1.3872326592511754, 110.29297004495014],
        [1.3879193447299463, 110.28902332523579],
        [1.3879193447299463, 110.2843902194841],
        [1.3856876161953937, 110.28061509627906],
        [1.3813958246448772, 110.2787275346765],
        [1.3750439589299674, 110.27889913118582],
        [1.3726405458690558, 110.28284585090019],
        [1.3690354217494942, 110.28730736014256],
        [1.3668036755292512, 110.28885172872646],
        [1.3710954933396995, 110.2957155890993],
        [1.3726405458690558, 110.30669776569586],
        [1.3750439589299674, 110.31098767842886],
        [1.3889493725742281, 110.31373322257801],
        [1.3942711759430766, 110.31973910040425],
        [1.4006229900172285, 110.31939590738558],
        [1.4086914857621253, 110.3171651527644],
        [1.4116098709675744, 110.31356162606869]
    ];

    const newSecondRegion = [
        [1.4019963529614132, 110.3164787667271],
        [1.4066314469452335, 110.31579238068986],
        [1.4031980448766734, 110.31304683654072],
        [1.4054297567952703, 110.30961490635428],
        [1.4078331364762988, 110.30686936220516],
        [1.4074897966734623, 110.3048102040933],
        [1.4026830341313976, 110.30412381805603],
        [1.3989062852052636, 110.30343743201873],
        [1.3920394534117957, 110.30103508088823],
        [1.3865459735731112, 110.299319115795],
        [1.384657586931592, 110.29520079957135],
        [1.384314243744162, 110.2852482020307],
        [1.3817391682545197, 110.28130148231632],
        [1.378134057880387, 110.28130148231632],
        [1.3748722866486802, 110.28353223693748],
        [1.3733272355617308, 110.28713576363324],
        [1.372125528470136, 110.29005290429173],
        [1.3743572697307493, 110.3030942390001],
        [1.376932353208927, 110.30686936220516],
        [1.3829408704973842, 110.30995809937292],
        [1.3903227423347615, 110.31339002955936],
        [1.3953012010133423, 110.31682195974578],
        [1.400279649155407, 110.31819473182034]
    ];

    const [thirdRegions, setThirdRegions] = useState([
        { id: 1, positions: [
            [1.4006229900172285, 110.30772734475175],
            [1.4016229900172283, 110.30772734475175],
            [1.4016229900172283, 110.30872734475176],
            [1.4006229900172285, 110.30872734475176],
            [1.4006229900172285, 110.30772734475175]
        ]},
        // ... other third regions ...
    ]);
    
    const [drawing, setDrawing] = useState(false);
    const [currentPolygon, setCurrentPolygon] = useState([]);
    const [poachingActivities, setPoachingActivities] = useState([]);
    const [isFirstTriggered, setIsFirstTriggered] = useState(false);
    const [triggeredRegionIndex, setTriggeredRegionIndex] = useState(-1);

    const sendTelegramNotification = (message, replyMarkup = null) => {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const data = {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            reply_markup: replyMarkup
        };
        axios.post(url, data).then(response => {
            console.log('Message sent to Telegram:', response.data);
        }).catch(error => {
            console.error('Error sending message to Telegram:', error);
        });
    };

    const simulatePoachingActivity = () => {
        const newActivity = {
            id: poachingActivities.length + 1,
            region: `Triggered Region ${(triggeredRegionIndex + 1) % 3 + 1}`,
            time: new Date().toLocaleString()
        };
        setPoachingActivities([...poachingActivities, newActivity]);
        setTriggeredRegionIndex((triggeredRegionIndex + 1) % 3);

        if ((triggeredRegionIndex + 1) % 3 === 2) {
            const gpsLocation = thirdRegions[0].positions[0];
            const replyMarkup = {
                inline_keyboard: [
                    [{ text: 'View Poaching Activities', 
                        url: `https://www.google.com/maps/search/?api=1&query=${gpsLocation[0]},${gpsLocation[1]}`,
                    }]
                ]
            };
            sendTelegramNotification('Poaching activity detected in Triggered Region 3', replyMarkup);
        }
    };

    function MapEvents() {
        const map = useMapEvents({
            moveend: (event) => {
                setMapCenter(event.target.getCenter());
            },
            zoomend: (event) => {
                setZoomLevel(event.target.getZoom());
            }
        });
        return null;
    }

    // Get color based on elevation
    const getElevationColor = (elevation) => {
        const minElevation = Math.min(...cameraTrapSites.map(site => site.elevation_m));
        const maxElevation = Math.max(...cameraTrapSites.map(site => site.elevation_m));
        const normalized = (elevation - minElevation) / (maxElevation - minElevation);
        return `rgb(${Math.round(255 * (1 - normalized))}, ${Math.round(100 + 155 * normalized)}, 100)`;
    };

    return (
        <div className="">
            <div className="flex flex-row h-screen bg-gray-100">
                <Sidebar />
                <div className="w-full p-4 flex flex-col justify-center items-center">
                    <MapContainer 
                        center={mapCenter} 
                        zoom={zoomLevel} 
                        style={{ height: "100%", width: "100%", cursor: 'point' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        
                        {/* Main park boundary */}
                        {regions.map(region => (
                            <Polygon 
                                key={region.id} 
                                positions={region.positions} 
                                pathOptions={{ color: 'blue', fillOpacity: 0 }}
                            >
                                <Popup>
                                    {region.name} <br /> 
                                    GPS: {region.positions[0][0]}, {region.positions[0][1]}
                                </Popup>
                            </Polygon>
                        ))}

                        {/* Camera trap site markers */}
                        {cameraTrapSites.map((site, index) => {
                            const [lat, long] = convertToLatLong(site.coordinate_x, site.coordinate_y);
                            return (
                                <CircleMarker 
                                    key={site.site_name}
                                    center={[lat, long]}
                                    radius={8}
                                    pathOptions={{
                                        color: selectedSite === site ? '#ff0000' : '#ff4400',
                                        fillColor: getElevationColor(site.elevation_m),
                                        fillOpacity: 0.7,
                                        weight: 2
                                    }}
                                    eventHandlers={{
                                        click: () => setSelectedSite(site),
                                        mouseover: (e) => {
                                            e.target.setStyle({ fillOpacity: 1 });
                                        },
                                        mouseout: (e) => {
                                            e.target.setStyle({ fillOpacity: 0.7 });
                                        }
                                    }}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <h3 className="font-bold mb-1">Site {site.site_name}</h3>
                                            <p>Elevation: {site.elevation_m}m</p>
                                            <p>Forest Cover: {site.forestCover_}%</p>
                                            <p className="text-xs mt-1">Coordinates: {lat.toFixed(6)}, {long.toFixed(6)}</p>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            );
                        })}

                        {/* Triggered regions */}
                        <Polygon positions={secondRegion} pathOptions={{ color: 'green', fillOpacity: 0.2 }}>
                            <Popup>1st Triggered Region</Popup>
                        </Polygon>
                        {triggeredRegionIndex === 0 && (
                            <Popup position={secondRegion[0]}>
                                1st Triggered Region is triggered!
                            </Popup>
                        )}

                        <Polygon positions={newSecondRegion} pathOptions={{ color: 'yellow', fillOpacity: 0.2 }}>
                            <Popup>2nd Triggered Region</Popup>
                        </Polygon>
                        {triggeredRegionIndex === 1 && (
                            <Popup position={newSecondRegion[0]}>
                                2nd Triggered Region is triggered!
                            </Popup>
                        )}

                        {thirdRegions.map(region => (
                            <Polygon 
                                key={region.id} 
                                positions={region.positions} 
                                pathOptions={{ color: 'red', fillOpacity: 0.2 }}
                            >
                                <Popup>3rd Triggered Region {region.id}</Popup>
                            </Polygon>
                        ))}
                        {triggeredRegionIndex === 2 && (
                            <Popup position={thirdRegions[0].positions[0]}>
                                3rd Triggered Region is triggered!
                            </Popup>
                        )}

                        {currentPolygon.length > 0 && (
                            <Polygon positions={currentPolygon}>
                                <Popup>Custom Polygon</Popup>
                            </Polygon>
                        )}

                        <MapEvents />
                    </MapContainer>

                    {/* Controls and information panels */}
                    <div className="flex mt-4">
                        <button 
                            onClick={simulatePoachingActivity} 
                            className="p-2 bg-red-500 text-white rounded"
                        >
                            Simulate Poaching Activity
                        </button>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="ml-2 p-2 bg-blue-500 text-white rounded"
                        >
                            Refresh Screen
                        </button>
                    </div>

                    {/* Site information panel */}
                    {selectedSite && (
                        <div className="mt-4 w-full bg-white shadow-md rounded p-4">
                            <h2 className="text-lg font-bold mb-2">Selected Site Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p><span className="font-bold">Site ID:</span> {selectedSite.site_name}</p>
                                    <p><span className="font-bold">Elevation:</span> {selectedSite.elevation_m}m</p>
                                </div>
                                <div>
                                    <p><span className="font-bold">Forest Cover:</span> {selectedSite.forestCover_}%</p>
                                    <p><span className="font-bold">Coordinates:</span> ({selectedSite.coordinate_x}, {selectedSite.coordinate_y})</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Poaching activities table */}
                    <div className="mt-4 w-full h-1/2 overflow-y-scroll bg-white shadow-md rounded p-4">
                        <h2 className="text-lg font-bold mb-2 text-center">Poaching Activities</h2>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b border-gray-200 text-center">ID</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center">Region</th>
                                    <th className="py-2 px-4 border-