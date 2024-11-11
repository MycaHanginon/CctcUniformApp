import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({icon, color, name, focused}) =>{
  return(
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
    </View>
  )

}

const TabLayout = () => {
  return (
   <>
    <Tabs>


      <Tabs.Screen
        name="home"
        options={{
          title:'Home',
          headerShown:false,
          tabBarIcon:({color,focused})=>(
           <TabIcon
            icon={icons.home}
            color={color}
            name="Home"
            focused={focused}
           />
          )
        }}
      />

    
<Tabs.Screen
        name="uniform"
        options={{
          title:'Uniform',
          headerShown:false,
          tabBarIcon:({color, focused})=>(
           <TabIcon
            icon={icons.uniform}
            color={color}
            name="Uniform"
            focused={focused}
           />
          )
        }}
      />
      
<Tabs.Screen
        name="chat"
        options={{
          title:'Chat',
          headerShown:false,
          tabBarIcon:({color,focused})=>(
           <TabIcon
            icon={icons.chat}
            color={color}
            name="Chat"
            focused={focused}
           />
          )
        }}
      />

 <Tabs.Screen
        name="user"
        options={{
          title:'User',
          headerShown:false,
          tabBarIcon:({color,focused})=>(
           <TabIcon
            icon={icons.user}
            color={color}
            name="User"
            focused={focused}
           />
          )
        }}
      />


    </Tabs>
   </>
  )
}

export default TabLayout