import React, {useMemo, useState, useEffect} from 'react';
import {GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
require('dotenv').config();