import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

interface OnboardProps {
    isLight: boolean;
    selected: boolean;
}

const Pagination = ({ isLight, selected }: OnboardProps) => {
    let backgroundColor, paginationWidth;
    if (isLight) {
        backgroundColor = selected ? '#FFD152' : '#BECFD8';
        paginationWidth = selected ? 16 : 8;
    }
    return (
        <View
            style={{
                width: paginationWidth,
                height: 4,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 4,
            }}
        />
    );
};

export default function OnboardingSwiper() {
    const navigation = useNavigation();

    return (
        <Onboarding
            showSkip={false}
            onDone={() => navigation.navigate('OrphanagesMap')}
            DotComponent={Pagination}
            bottomBarColor={'#F2F3F5'}
            pages={[
                {
                    backgroundColor: '#F2F3F5',
                    image: <Image style={styles.image} source={require('../images/earth-draw.png')} />,
                    title: <Text style={styles.title}>Leve felicidade para o mundo</Text>,
                    subtitle: <Text style={styles.text}>Visite orfanatos e mude o dia de muitas crianças.</Text>
                },
                {
                    backgroundColor: '#F2F3F5',
                    image: <Image style={styles.image} source={require('../images/children-draw.png')} />,
                    title: <Text style={styles.subtitle}>Escolha um orfanato no mapa e faça uma visita</Text>,
                    subtitle: <Text></Text>,
                }
            ]}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: -40
    },

    title: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 48,
        lineHeight: 48,
        color: '#0089A5',
        marginHorizontal: 46
    },

    text: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        lineHeight: 38,
        color: '#5C8599',
        marginHorizontal: 46
    },

    subtitle: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 30,
        lineHeight: 36,
        color: '#0089A5',
        textAlign: 'right',
        marginLeft: 40,
        maxWidth: 253,
    }
})