import React, { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrellaBeach, faWind, faBuilding, faMountain, faSwimmingPool, faWater, faSkiing, faCampground, faSnowflake, faMountainSun, faTree, faSun, faTractor, faGem, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

export const categories = [
  {
    label: "Beach",
    icon: faUmbrellaBeach,
    description: "This property is close to the beach!"
  },
  {
    label: "Windmills",
    icon: faWind,
    description: "This property has windmills!"
  },
  {
    label: "Modern",
    icon: faBuilding,
    description: "This property is modern!"
  },
  {
    label: "CountrySide",
    icon: faMountain,
    description: "This property is in Countryside!"
  },
  {
    label: "Pools",
    icon: faSwimmingPool,
    description: "This property has a pool"
  },
  {
    label: "Islands",
    icon: faWater,
    description: "This property is on an Island!"
  },
  {
    label: "Lake",
    icon: faWater,
    description: "This property is close to a lake"
  },
  {
    label: "Skiing",
    icon: faSkiing,
    description: "This property has skiing activities!"
  },
  {
    label: "Castles",
    icon: faLandmark,
    description: "This property is in a castle"
  },
  {
    label: "Camping",
    icon: faCampground,
    description: "This property has camping activities"
  },
  {
    label: "Arctic",
    icon: faSnowflake,
    description: "This property is in the Arctic!"
  },
  {
    label: "Cave",
    icon: faMountainSun,
    description: "This property is in a cave!"
  },
  {
    label: "Desert",
    icon: faSun,
    description: "This property is in the desert"
  },
  {
    label: "Barns",
    icon: faTractor,
    description: "This property is in a barn!"
  },
  {
    label: "Lux",
    icon: faGem,
    description: "This property is luxurious"
  },
];

function Categories({ selectedLabel, setSelectedLabel }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/") {
      const currentCategory = params?.get('category');
      setSelectedLabel(currentCategory || ""); // Set selectedLabel based on the current query parameter
    }
  }, [params, pathName, setSelectedLabel]); // Re-run this effect whenever params or pathName change

  if (pathName !== "/") {
    return null;
  }

  const handleClick = useCallback((label: any) => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
      setSelectedLabel(""); // Reset selection if the same category is clicked
    } else {
      setSelectedLabel(label); // Set selected category
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [params, router, setSelectedLabel]);

  return (
    <div className='pt-4 flex items-center justify-between overflow-x-auto'>
      {categories.map((item) => (
        <div onClick={() => { handleClick(item.label) }} key={item.label} className={`flex flex-col items-center justify-center gap-3 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
            ${selectedLabel === item.label ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}`}>
          <FontAwesomeIcon icon={item.icon} width={50} height={50} />
          <div className='font-medium text-sm'>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default Categories;
