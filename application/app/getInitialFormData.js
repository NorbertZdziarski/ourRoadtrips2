export const getInitialFormData = (type,loggedUser, dataId) => {
    if (type === 'trip') {
        return {
            tripName: dataId.tripName || '',
            tripDescription:dataId.tripDescription ||  '',
            tripCar: dataId.tripCar ||  '',
            tripDate: dataId.tripDate || '',
            tripCountry: dataId.tripCountry || '',
            tripType: dataId.tripType || '',
            tripPhoto: dataId.tripPhoto || '',
            tripMap: dataId.tripMap || '',
            tripUser: loggedUser.nick,
            tripUserId: loggedUser._id,
            tripSaveDate: new Date(),
            tripRate: dataId.tripRate || [],
            tripComments: dataId.tripComments || [],
            tripPublic: dataId.tripPublic || false

        };
    } else if (type === 'car') {
        return {
            carId: dataId.carId || '',
            carMaker: dataId.carMaker || '',
            carBrand: dataId.carBrand || '',
            carDescription: dataId.carDescription || '',
            carEngine: dataId.carEngine || '',
            carEnginePower: dataId.carEnginePower || '',
            carStyleType: dataId.carStyleType || '',
            carPurposeType: dataId.carPurposeType || '',
            carPhoto: dataId.carPhoto || ''
        };

    } else {
        return {
            nick: loggedUser.nick || '',
            firstName: loggedUser.firstName || '',
            lastName: loggedUser.lastName || '',
            userDescription: loggedUser.userDescription ||'',
            userPersonalComment: loggedUser.userPersonalComment ||'',
            cars: loggedUser.cars || [],
            email: loggedUser.email || '',
            password: ''
        };
    }
}