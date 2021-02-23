import slugify from 'slugify';
import rawData from './coloradoroads.json';

const data = [];

rawData.Cameras.forEach((el) => {
  const cam = {};

  cam.name = el.Name;
  cam.slug = slugify(el.Name, {
    remove: /[*+~.()'"!/#:@]/g,
    lower: true,
  });
  cam.latitude = el.Location.Latitude;
  cam.longitude = el.Location.Longitude;

  if (el.CameraView[0]) {
    cam.imageURL = `https://www.cotrip.org/${el.CameraView[0].ImageLocation}`;
    cam.description = el.CameraView[0].ViewDescription;
  } else if (
    el.CameraView.ImageLocation.indexOf('http://') === 0 ||
    el.CameraView.ImageLocation.indexOf('https://') === 0
  ) {
    cam.imageURL = el.CameraView.ImageLocation;
    cam.description = el.CameraView.ViewDescription;
  } else {
    cam.imageURL = `https://www.cotrip.org/${el.CameraView.ImageLocation}`;
    cam.description = el.CameraView.ViewDescription;
  }

  if (el.CameraView[0]) {
    cam.route = el.CameraView[0].RoadName;
    cam.routeSlug = slugify(el.CameraView[0].RoadName, {
      remove: /[*+~.()'"!/#:@]/g,
      lower: true,
    });
    cam.milepoint = el.CameraView[0].MileMarker;
  } else {
    cam.route = el.CameraView.RoadName;
    cam.routeSlug = slugify(el.CameraView.RoadName, {
      remove: /[*+~.()'"!/#:@]/g,
      lower: true,
    });
    cam.milepoint = el.CameraView.MileMarker;
  }

  cam.credit = 'COtrip';
  cam.creditLink = 'https://www.cotrip.org/home.htm';

  data.push(cam);
});

export { data };
