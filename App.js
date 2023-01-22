import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, ViewPropTypes } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreenMP from './app/screens/LoginScreenMP'
import AccountScreen from './app/screens/AccountScreen';
import AccountScreenAdmin from './app/screens/AccountScreenAdmin';
import ViewDoseScreen from './app/screens/ViewDoseScreen';
import AccountScreenMP from './app/screens/AccountScreenMP';
import ViewStaff from './app/screens/ViewStaff';
import ViewPatients from './app/screens/ViewPatients';
import ViewAllDoses from './app/screens/ViewAllDoses';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext from "./app/config/context";
import { Users } from './app/components/Users';
import LoginScreenAdmin from './app/screens/LoginScreenAdmin';
import ViewStaffPatient from './app/screens/ViewStaffPatient';
const Stack = createStackNavigator();





export default App = () => {
  const [Data, setData] = useState(null);
  const [Data1, setData1] = useState(null);
  useEffect(() => {
    
  }, []);

  
    
  return(
    <AuthContext.Provider
    value={{ Data, setData}}
 >
   
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Home" component={WelcomeScreen} />
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Register" component={RegisterScreen} />
<Stack.Screen name="LoginMP" component={LoginScreenMP} />
<Stack.Screen name="AccountMP" component={AccountScreenMP} />
<Stack.Screen name="Account" component={AccountScreen} />
<Stack.Screen name="ViewDose" component={ViewDoseScreen}/>
<Stack.Screen name="LoginAdmin" component={LoginScreenAdmin}/>
<Stack.Screen name="AccountAdmin" component={AccountScreenAdmin}/>
<Stack.Screen name="ViewPatients" component={ViewPatients}/>
<Stack.Screen name="ViewStaff" component={ViewStaff}/>
<Stack.Screen name="ViewAllDoses" component={ViewAllDoses}/>
<Stack.Screen name="ViewStaffPatient" component={ViewStaffPatient}/>
</Stack.Navigator>
</NavigationContainer>
</AuthContext.Provider>
    )
};
