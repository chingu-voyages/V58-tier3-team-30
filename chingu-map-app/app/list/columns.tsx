"use client"

import { ColumnDef } from '@tanstack/react-table';
import { ChinguType } from '../../features/chingu/chingu.type';

export const columns: ColumnDef<ChinguType>[] = [
  {
    accessorKey: "countryName",
    header: "Country Name",
  },
  {
    accessorKey: "countryCode",
    header: "Country Code",
  },
  {
    accessorKey: "timezone",
    header: "Time Zone",
  },
  {
    accessorKey: "voyageRole",
    header: "Voyage Role",
  },
  {
    accessorKey: "roleType",
    header: "Role Type",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "goal",
    header: "Goal",
  },
  {
    accessorKey: "goalOther",
    header: "Other Goals",
  },
  {
    accessorKey: "source",
    header: "Other Source",
  },
  {
    accessorKey: "soloProjectTier",
    header: "Solo Project Tier",
  },
  {
    accessorKey: "voyageSignup",
    header: "Voyage Signup",
  },
  {
    accessorKey: "voyageTier",
    header: "Voyage Tier",
  },
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "timestamp",
    header: "timestamp",
  },
]
