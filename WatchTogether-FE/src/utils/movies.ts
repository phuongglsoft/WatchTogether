import { Movie } from '../type/type';
import yesterdayOnceMore from '../assets/Yesterday once more.mp4';
import yesterdayOnceMoreThump from '../assets/yester once more.jpg';
import hotelCalifornia from '../assets/Hotel California.mp4';
import healTheWorld from '../assets/Heal the world.mp4';
import healTheWorldThump from '../assets/Heal the world.jpg';
import hotelCaliforniaThump from '../assets/Hotel California.png';
export const movies: Movie[] = [
    { code: 1, name: 'Yesterday once more', src: yesterdayOnceMore, thumpNail: yesterdayOnceMoreThump },
    { code: 2, name: 'Heal the world', src: healTheWorld, thumpNail: healTheWorldThump },
    { code: 3, name: 'Hotel California', src: hotelCalifornia, thumpNail: hotelCaliforniaThump }
];