import { createClient } from "@supabase/supabase-js";

import factoryLogo from "./assets/game_logos/Factory_Logo.webp";
import monsterBrawlLogo from "./assets/game_logos/Monster_Brawl_Logo.webp";
import fishingFrenzyLogo from "./assets/game_logos/Fishing_Frenzy_Logo.webp";
import towerDefenseLogo from "./assets/game_logos/Tower_Defense_Logo.webp";
import towerDefense2Logo from "./assets/game_logos/Tower_Defense_2_Logo.webp";
import cafeLogo from "./assets/game_logos/Cafe_Logo.webp";
import crazyKingdomLogo from "./assets/game_logos/Crazy_Kingdom_Logo.webp";
import statsLogo from "./assets/game_logos/Stats_Logo.png";
import extrasLogo from "./assets/game_logos/Extras_Logo.png";
import BElite from "./assets/B-Elite.png";

import batIcon from "./assets/icons/bat.png";
import calendarIcon from "./assets/icons/calendar.png";
import cashIcon from "./assets/icons/cash.png";
import checkIcon from "./assets/icons/check.png";
import chickIcon from "./assets/icons/chick.png";
import cogIcon from "./assets/icons/cog.png";
import comboIcon from "./assets/icons/combo.png";
import controllerIcon from "./assets/icons/controller.png";
import damageIcon from "./assets/icons/damage.png";
import desertIcon from "./assets/icons/desert.png";
import dragonIcon from "./assets/icons/dragon.png";
import elfIcon from "./assets/icons/elf.png";
import goldfishIcon from "./assets/icons/fish-blook.png";
import fishIcon from "./assets/icons/fish-icon.png";
import frenchtoastIcon from "./assets/icons/french-toast.png";
import goldIcon from "./assets/icons/gold.png";
import magnetIcon from "./assets/icons/magnet.png";
import meadowIcon from "./assets/icons/meadow.png";
import milkIcon from "./assets/icons/milk.png";
import mineIcon from "./assets/icons/mine.png";
import owlIcon from "./assets/icons/owl.png";
import personIcon from "./assets/icons/person.png";
import pigIcon from "./assets/icons/pig.png";
import pizzaIcon from "./assets/icons/pizza.png";
import pointsIcon from "./assets/icons/points.png";
import squirrelIcon from "./assets/icons/squirrel.png";
import stopwatchIcon from "./assets/icons/stopwatch.png";
import swordsIcon from "./assets/icons/swords.png";
import toastIcon from "./assets/icons/toast.png";
import tokenIcon from "./assets/icons/token.png";
import trophyIcon from "./assets/icons/trophy.png";
import unicornIcon from "./assets/icons/unicorn.png";
import unlockIcon from "./assets/icons/unlock.png";
import waffleIcon from "./assets/icons/waffle.png";
import wizardIcon from "./assets/icons/wizard.png";
import xIcon from "./assets/icons/x.png";
import yetiIcon from "./assets/icons/yeti.png";
import flappyIcon from "./assets/icons/flappy.png";
import gemIcon from "./assets/icons/gem.png";

export const icons = [
    batIcon,
    calendarIcon,
    cashIcon,
    checkIcon,
    chickIcon,
    cogIcon,
    comboIcon,
    controllerIcon,
    damageIcon,
    desertIcon,
    dragonIcon,
    elfIcon,
    goldfishIcon,
    fishIcon,
    frenchtoastIcon,
    goldIcon,
    magnetIcon,
    meadowIcon,
    milkIcon,
    mineIcon,
    owlIcon,
    personIcon,
    pigIcon,
    pizzaIcon,
    pointsIcon,
    squirrelIcon,
    stopwatchIcon,
    swordsIcon,
    toastIcon,
    tokenIcon,
    trophyIcon,
    unicornIcon,
    unlockIcon,
    waffleIcon,
    wizardIcon,
    xIcon,
    yetiIcon,
    flappyIcon,
    gemIcon,
  ],
  supabase = createClient(
    "https://zacycauwtkwjxbufkmjk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphY3ljYXV3dGt3anhidWZrbWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNTM4NjMsImV4cCI6MjA0NTYyOTg2M30.SYa6fSMtGb1JSynCltNAv1HEn9Imy_GC3eUqygPPZ9o"
  );
export default supabase;

export {
  factoryLogo,
  monsterBrawlLogo,
  fishingFrenzyLogo,
  towerDefenseLogo,
  towerDefense2Logo,
  cafeLogo,
  crazyKingdomLogo,
  statsLogo,
  extrasLogo,
  BElite,
  batIcon,
  calendarIcon,
  cashIcon,
  checkIcon,
  chickIcon,
  cogIcon,
  comboIcon,
  controllerIcon,
  damageIcon,
  desertIcon,
  dragonIcon,
  elfIcon,
  goldfishIcon,
  fishIcon,
  frenchtoastIcon,
  goldIcon,
  magnetIcon,
  meadowIcon,
  milkIcon,
  mineIcon,
  owlIcon,
  personIcon,
  pigIcon,
  pizzaIcon,
  pointsIcon,
  squirrelIcon,
  stopwatchIcon,
  swordsIcon,
  toastIcon,
  tokenIcon,
  trophyIcon,
  unicornIcon,
  unlockIcon,
  waffleIcon,
  wizardIcon,
  xIcon,
  yetiIcon,
  flappyIcon,
  gemIcon,
};

export async function getUsers() {
  const { data, error } = await supabase.from("Users").select();

  if (error) {
    console.error(error);
  } else {
    return data;
  }
}

export function firstUppercase(string) {
  return String(string).charAt(0).toUpperCase();
}
