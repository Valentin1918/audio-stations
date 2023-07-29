import { useLocation, useNavigate } from 'react-router-dom';

const useQueryParameters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const updateStationIdInUrl = (newStationId: string) => {
    queryParams.set('stationId', newStationId);
    const newLocation = { ...location, search: queryParams.toString() };
    navigate(newLocation);
  };

  return {
    stationIdInUrl: queryParams.get('stationId'),
    updateStationIdInUrl,
  };
};

export default useQueryParameters;
