const tintColorLight = '#FBBC05';
const tintColorDark = '#FBBC05';

export default {
  light: {
    background: '#fff',
    text: '#000',
    iconDefault: '#000',
    shadow: '#000',
    
    tint: tintColorLight,
    tintLight: 'hsl(45, 97%, 55%)',
    tintDark: 'hsl(45, 97%, 45%)',

    homeRouteButtons: '#E6E6E6',
    exerciseBlockBackground: '#E6E6E6',
    addExerciseButton: '#EFEFEF',
    
    tabIconDefault: '#000',
    tabIconSelected: tintColorLight,
    tabBar: '#FFF',
    tabBarAddBackground: '#033043',
    tabBarAddTint: tintColorLight,
    unfocusedTabButton: '#222',
    focusedTabButton: tintColorLight,//'#673ab7',

    modalBackground: '#E6E6E6',
    modalBorder: '#A6A6A6',
  },
  dark: {
    background: '#2F495A',
    text: '#fff',
    iconDefault: '#fff',
    shadow: '#000',

    tint: tintColorDark,
    tintLight: 'hsl(45, 97%, 55%)',
    tintDark: 'hsl(45, 97%, 45%)',
    
    homeRouteButtons: '#3D5F75',
    exerciseBlockBackground: '#3D5F75',//'#E6E6E6',// To be changed
    addExerciseButton: 'hsl(204, 31%, 20%)',
    
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    tabBar: '#000', // To be changed
    tabBarAddBackground: '#033043', // To be changed
    tabBarAddTint: tintColorDark,
    unfocusedTabButton: '#fff',
    focusedTabButton: tintColorDark,//'#673ab7',

    modalBackground: 'hsl(204, 31%, 27%)',//'#3D5F75',
    modalBorder: 'hsl(204, 31%, 22%)',
  },
};
