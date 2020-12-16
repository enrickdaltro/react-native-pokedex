import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import colors from '../../../../assets/colors';
import { HEIGHT, WIDTH } from '../../../../utils/dimensions';
import Loader from '../../../../components/Loader';
import { getStatName } from '../../../../helpers/details';
import { IStats } from '../../../../@types/details';

interface IStatsColumn {
  stats: IStats[];
  loading: boolean;
  baseColor: string;
}

const StatsColumn: React.FC<IStatsColumn> = ({ stats, loading, baseColor }) => {
  const getBarWidth = (base: number): number => {
    return base;
  };

  const getBarBg = (base: number): string => {
    return base <= 99 ? colors.typePsychic : colors.typeGrass;
  };

  return (
    <View style={styles.bottomSection}>
      {loading && <Loader loading={loading} />}
      {!loading && (
        <>
          <Text style={[styles.startLabelTitle, { color: baseColor }]}>Base Stats</Text>
          {stats.map((item) => (
            <View key={`${item.name} + ${item.base_stat}`} style={styles.row}>
              <Text style={styles.name}>{getStatName(item.name)}</Text>
              <Text style={styles.base}>{item.base_stat}</Text>
              <View style={styles.border}>
                <View
                  style={[
                    styles.overlay,
                    {
                      width: getBarWidth(item.base_stat),
                      backgroundColor: getBarBg(item.base_stat),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    backgroundColor: colors.white,
    height: HEIGHT * 0.6,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: -1,
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: colors.disabledGrey,
    marginBottom: 15,
  },
  startLabelTitle: {
    alignSelf: 'flex-start',
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 15,
  } as TextStyle,
  name: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
  } as TextStyle,
  base: {
    flex: 0.5,
    fontSize: 16,
  } as TextStyle,
  border: {
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.darkGrey,
    flex: 1.5,
  },
  overlay: {
    position: 'absolute',
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.typeGrass,
    top: 0,
  },
});

export default StatsColumn;
