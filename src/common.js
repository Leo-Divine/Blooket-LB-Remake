import { faUsers, faReply, faTrophy } from "@fortawesome/free-solid-svg-icons";
export const FontAwesomeIcons = {
  users: faUsers,
  reply: faReply,
  trophy: faTrophy,
}

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

export const Icons = {
    CALENDAR: calendarIcon,
    CASH: cashIcon,
    CHECK: checkIcon,
    CHICK_BLOOK: chickIcon,
    CLOCK_BAT_BLOOK: batIcon,
    COG: cogIcon,
    COMBO_BLOOK: comboIcon,
    CONTROLLER: controllerIcon,
    DAMAGE: damageIcon,
    DESERT: desertIcon,
    DRAGON_BLOOK: dragonIcon,
    ELF_BLOOK: elfIcon,
    GOLDFISH_BLOOK: goldfishIcon,
    FISH: fishIcon,
    FLAPPY: flappyIcon,
    FRENCH_TOAST_BLOOK: frenchtoastIcon,
    GEM: gemIcon,
    GOLD: goldIcon,
    MAGNET: magnetIcon,
    MEADOW: meadowIcon,
    MILK_BLOOK: milkIcon,
    MINE: mineIcon,
    OWL_BLOOK: owlIcon,
    PERSON: personIcon,
    PIG_BLOOK: pigIcon,
    PIZZA_BLOOK: pizzaIcon,
    POINTS: pointsIcon,
    SQUIRREL_BLOOK: squirrelIcon,
    STOPWATCH: stopwatchIcon,
    SWORDS: swordsIcon,
    TOAST_BLOOK: toastIcon,
    TOKEN: tokenIcon,
    TROPHY: trophyIcon,
    UNICORN_BLOOK: unicornIcon,
    UNLOCK: unlockIcon,
    WAFFLE_BLOOK: waffleIcon,
    WIZARD_BLOOK: wizardIcon,
    X: xIcon,
    YETI_BLOOK: yetiIcon,
  };

export async function getUsers() {
  const { data, error } = await supabase.from("Users").select();
  if (error) {
    throw error;
  }
  return data;
}

export function firstUppercase(string) {
  return String(string).charAt(0).toUpperCase();
}

export function toTimeString(score) {
  const length = score.toString().length;
  return `${score.toString().substring(0, length - 7).padStart(2, "0")}:${score.toString().substring(length - 7, length - 5).padStart(2, "0")}:${score.toString().substring(length - 5, length - 3).padStart(2, "0")}.${score.toString().substring(length - 3)}`;
}

export function getBlookImage(blook) {
  if (blook == "Elite") {
    return BElite;
  }
  return `https://ac.blooket.com/marketassets/blooks/${(blook).replaceAll(" ", "").toLowerCase()}.svg`;
}