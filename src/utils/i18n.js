import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
  en: {
    name: 'sudoku.',
    newGame: 'New Game',

    continue: 'Continue ',
    restart: 'Restart  ',
    newgame: 'New Game ',
    nowToPlay: 'How to Play?',
    weekrank: 'Week Rank',
    norecord: 'No records yet',
    onlinerank: 'Online Rank',
    rank: 'You are at %{rank}',

    ok: 'Got it',
    congrats: 'Congrats',
    nosolve: 'No solve after this move',
    success: 'You solve this game in\n',
    fail: 'You lose this game for more then 3 wrong moves',
    errormove:
      'Wrong move for %{error} times, you will lose for more than 3 times',
    newrecord: 'New record! You solve this game in\n',

    uploadrecord: 'Send you record to the server?',
    uploadmessage: 'You have to upload your record to view the online rank',
    reject: 'Reject',
    grant: 'Grant',
    loading: 'loading……',
    error: 'Error',
    uplaoderror: 'Upload failed',
    queryerror: 'Query failed',

    share: 'Share',
    sharemessage: 'Sudoku Master - for pure sudoku pleasure',
    sharefailed: 'Share faild',

    rate: 'Rate this app',
    ratemessage: 'I developed this app for fun, your rate is my great hornor',
    cancel: 'Cancel',
    confirm: 'Confrim',
  },
};

export default I18n;
