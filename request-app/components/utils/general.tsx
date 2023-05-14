// render different badge depending on priority

import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

export type ColumnsReq = {
  name: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  assigned_to: string[];
  status: string;
};

export type RowReq = {
  name: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  assigned_to: string[];
  status: string;
  id: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
};

function renderPriorityBadge(priority: string, sizex: number, sizey: number) {
  const p = priority.toLowerCase();
  if (p === "p1") {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-red-100 text-red-800`}
        >
          P1
        </span>
      </div>
    );
  } else if (p === "p2") {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-yellow-100 text-yellow-800`}
      >
        P2
      </span>
    );
  } else {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-green-100 text-green-800`}
      >
        P3
      </span>
    );
  }
}

function renderStatusBadge(status: string, sizex: number, sizey: number) {
  const s = status.toLowerCase();
  if (s === "not started") {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-red-100 text-red-800`}
        >
          <RiCheckboxBlankCircleFill className="mr-1" />
          Not Started
        </span>
      </div>
    );
  } else if (s === "in progress") {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-yellow-100 text-yellow-800`}
      >
        <RiCheckboxBlankCircleFill className="mr-1" />
        In Progress
      </span>
    );
  } else {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-green-100 text-green-800`}
      >
        <RiCheckboxBlankCircleFill className="mr-1" />
        Completed
      </span>
    );
  }
}

function renderTypeBadge(type: string, sizex: number, sizey: number) {
  const t = type.toLowerCase();
  if (t === "functional") {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-lg font-medium bg-cyan-100 text-cyan-800`}
        >
          Functional
        </span>
      </div>
    );
  } else {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-lg font-medium bg-purple-100 text-purple-800`}
      >
        Non-Functional
      </span>
    );
  }
}

function renderProjectStatusBadge(
  status: string,
  sizex: number,
  sizey: number
) {
  const s = status.toLowerCase();
  if (s === "active") {
    return (
      <div className="priority-badge">
        <span
          className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-green-100 text-green-800`}
        >
          {/* <RiCheckboxBlankCircleFill className="mr-1" /> */}
          Active
        </span>
      </div>
    );
  } else if (s === "on hold") {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-yellow-100 text-yellow-800`}
      >
        {/* <RiCheckboxBlankCircleFill className="mr-1" /> */}
        On Hold
      </span>
    );
  } else if (s === "completed") {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-purple-100 text-purple-800`}
      >
        {/* <RiCheckboxBlankCircleFill className="mr-1" /> */}
        Completed
      </span>
    );
  } else {
    return (
      <span
        className={`inline-flex items-center px-${sizex} py-${sizey} rounded-full text-sm font-medium bg-red-100 text-red-800`}
      >
        {/* <RiCheckboxBlankCircleFill className="mr-1" /> */}
        Cancelled
      </span>
    );
  }
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function generatePastelColor() {
  // Set the saturation and lightness to a fixed value to generate a pastel color
  const saturation = 50; // 50% saturation
  const lightness = 75; // 75% lightness

  // Generate a random hue between 0 and 360
  const hue = Math.floor(Math.random() * 360);

  // Convert the HSL color to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  };

  // Convert the RGB color to a hex string
  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Convert the HSL color to RGB and then to a hex string
  const { r, g, b } = hslToRgb(hue, saturation / 100, lightness / 100);
  const hexColor = rgbToHex(r, g, b);

  return hexColor;
}

export type UserIdAndName = {
  id: string;
  name: string;
};

function renderImage(avatar_url: any) {
  const avatar = createAvatar(personas, {
    skinColor: avatar_url.skinColor,
    hair: avatar_url.hair,
    hairColor: avatar_url.hairColor,
    facialHair: avatar_url.facialHair,
    facialHairProbability: avatar_url.facialHairProbability,
    body: avatar_url.body,
    clothingColor: avatar_url.clothingColor,
    eyes: avatar_url.eyes,
    mouth: avatar_url.mouth,
    nose: avatar_url.nose,
    backgroundColor: avatar_url.backgroundColor,
    radius: 50,
  });
  // console.log(avatar.toJson());
  const svgData = encodeURIComponent(avatar.toString());
  // console.log(svgData);
  return svgData;
}

export {
  renderPriorityBadge,
  renderStatusBadge,
  renderTypeBadge,
  classNames,
  generatePastelColor,
  renderImage,
  renderProjectStatusBadge,
};
