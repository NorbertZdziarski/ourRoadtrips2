export const getInitialFormData = (type,loggedUser, dataId) => {

    if (type === 'trip') {
        return {
            userId: loggedUser._id,
            tripName: dataId.tripName || '',
            tripDescription:dataId.tripDescription ||  '',
            tripCar: dataId.tripCar ||  '',
            tripCarId: dataId.tripCarId ||  '',
            tripCarStyleType: dataId.tripCarStyleType ||  '',
            tripDate: dataId.tripDate || '',
            tripCountry: dataId.tripCountry || '',
            tripType: dataId.tripType || '',
            tripPhoto: dataId.tripPhoto || [],
            tripMap: dataId.tripMap || '',
            tripUser: loggedUser.nick,
            tripSaveDate: new Date(),
            tripRate: dataId.tripRate || [],
            tripComments: dataId.tripComments || [],
            groups: dataId.groups || [],
            tripPublic: dataId.tripPublic || false

        };
    } else if (type === 'car') {
        return {
            userId: loggedUser._id,
            carUser: loggedUser.nick,
            carSaveDate: new Date(),
            carMaker: dataId.carMaker || '',
            carBrand: dataId.carBrand || '',
            carDescription: dataId.carDescription || '',
            carEngine: dataId.carEngine || '',
            carEnginePower: dataId.carEnginePower || '',
            carFuelType: dataId.carFuelType || '',
            carStyleType: dataId.carStyleType || '',
            carPurposeType: dataId.carPurposeType || '',
            carPhoto: dataId.carPhoto || [],
            public: dataId.public || false,
            groups: dataId.groups || []
        };
    } else if (type === 'group') {
        return {
            saveDate: new Date(),
            owner: dataId.owner || loggedUser.nick,
            ownerId: dataId.ownerId || loggedUser._id,
            name: dataId.name || '',
            description: dataId.description || '',
            type: dataId.type || '',
            photo: dataId.photo || '',
            public: dataId.public || false,
            comments: dataId.comments || [],
            design: dataId.design || [],
            users: dataId.users || [],
            trips: dataId.trips || [],
            cars: dataId.cars || []
        };

    } else {
        return {
            nick: loggedUser.nick || '',
            firstName: loggedUser.firstName || '',
            lastName: loggedUser.lastName || '',
            userPersonalComment: loggedUser.userPersonalComment ||'',
            userDescription: loggedUser.userDescription ||'',
            email: loggedUser.email || '',
            userPhoto: loggedUser.userPhoto || '',
            dateOfAccountCreation: loggedUser.dateOfAccountCreation || new Date(),
            cars: loggedUser.cars || [],
            groups: loggedUser.groups || [],
            privateMessages: loggedUser.privateMessages || []
        };
    }
}