import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import studyIcon from '../../assets/images/icons/study.png'
import ladingImg from '../../assets/images/landing.png'
import api from '../../services/api'
import styles from './styles'

const Landing: React.FC = () => {
  const { navigate } = useNavigation()

  const [totalConnections, setTotalConnections] = useState<number>(0)

  useEffect(() => {
    api.get('connections').then((response) => {
      setTotalConnections(response.data.total)
    })
  }, [])

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleNavigateToStudyPages() {
    navigate('Study')
  }
  return (
    <View style={styles.container}>
      <Image source={ladingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja Fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClassesPage}
          style={[styles.button, styles.buttonSecundary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnection}>
        Total de {totalConnections} conexões já realizadas.{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing
