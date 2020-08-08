import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import styles from './styles'

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation()

  function handleNavigateBack() {
    goBack()
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.content}
        source={giveClassesBgImage}
      >
        <Text style={styles.title}>Quer ser um Proffy? </Text>
        <Text style={styles.description}>
          Você precisa se cadastrar na nossa plataforma web.
        </Text>
      </ImageBackground>
      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses
