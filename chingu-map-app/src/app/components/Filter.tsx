'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIView } from '@/stores/useUIViewStore';

export const Filter = () => {
  const { filters, setFilter, clearFilter, clearFilters } = useFilterStore();
  const [filterState, setFilterState] = useState({
    voyageRole: 'all',
    roleType: 'all',
    soloProjectTier: 'all',
    voyage: 'all',
    voyageTier: 'all',
    gender: 'all',
  });
  const { currentView } = useUIView();

  const handleDialogOpenChange = (open: boolean) => {
    if (open) {
      setFilterState({
        voyageRole: filters.voyageRole || 'all',
        roleType: filters.roleType || 'all',
        soloProjectTier: filters.soloProjectTier || 'all',
        voyage: filters.voyageSignup || 'all',
        voyageTier: filters.voyageTier || 'all',
        gender: filters.gender || 'all',
      });
    }
  };

  const handleFilterReset = () => {
    setFilterState({
      voyageRole: 'all',
      roleType: 'all',
      soloProjectTier: 'all',
      voyage: 'all',
      voyageTier: 'all',
      gender: 'all',
    });
    clearFilters();
  };

  const handleFilterSubmit = () => {
    Object.entries(filterState).forEach(([key, val]) => {
      console.log(key, val);
      if (val === 'all') {
        clearFilter(key);
        return;
      }

      setFilter(`${key}`, val);
    });
  };

  if (currentView === 'home') return;

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`border-chingu-green-300 rounded-full w-10 h-10 p-0 ${
            hasActiveFilters
              ? 'bg-chingu-green-100 text-chingu-green-600'
              : 'bg-chingu-green-600 text-chingu-green-100'
          } hover:bg-chingu-green-100 hover:text-chingu-green-600`}
        >
          <Settings2 className="rotate-90 -scale-y-100" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-chingu-green-600 [&>button]:text-chingu-green-100 border-chingu-green-300">
        <DialogHeader>
          <DialogTitle className="self-start text-chingu-green-100">
            Filters
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="role" className="text-white">
              Role
            </Label>
            <Select
              name="voyageRole"
              value={filterState.voyageRole}
              onValueChange={(value) => {
                setFilterState((prev) => ({
                  ...prev,
                  voyageRole: value,
                }));
              }}
            >
              <SelectTrigger className="w-full text-chingu-green-100 border-chingu-green-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-chingu-green-600 text-chingu-green-100">
                <SelectItem
                  value="all"
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="developer"
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                >
                  Developer
                </SelectItem>
                <SelectItem
                  value="ui/ux designer"
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                >
                  UI/UX Designer
                </SelectItem>
                <SelectItem
                  value="scrum master"
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                >
                  Scrum Master
                </SelectItem>
                <SelectItem
                  value="Product Owner"
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                >
                  Product Owner
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="roleType" className="text-white">
              Role Type
            </Label>
            <Select
              name="roleType"
              value={filterState.roleType}
              onValueChange={(value) => {
                setFilterState((prev) => ({
                  ...prev,
                  roleType: value,
                }));
              }}
            >
              <SelectTrigger className="w-full text-chingu-green-100 border-chingu-green-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-chingu-green-600 text-chingu-green-100">
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="all"
                >
                  All
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="python"
                >
                  Python
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="web"
                >
                  Web
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="soloProjectTier" className="text-white">
              Solo Project Tier
            </Label>
            <ToggleGroup
              type="single"
              value={filterState.soloProjectTier}
              spacing={1}
              className="w-full justify-between"
              onValueChange={(value) => {
                setFilterState((prev) => ({
                  ...prev,
                  soloProjectTier: value,
                }));
              }}
            >
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="all"
              >
                All
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="tier 1"
              >
                Tier 1
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="tier-2"
              >
                Tier 2
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="tier-3"
              >
                Tier 3
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="voyage" className="text-white">
              Voyage
            </Label>
            <Select
              name="voyage"
              value={filterState.voyage}
              onValueChange={(value) => {
                setFilterState((prev) => ({
                  ...prev,
                  voyage: value,
                }));
              }}
            >
              <SelectTrigger className="w-full text-chingu-green-100 border-chingu-green-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-chingu-green-600 text-chingu-green-100">
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="all"
                >
                  All
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V33"
                >
                  V33
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V34"
                >
                  V34
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V35"
                >
                  V35
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V36"
                >
                  V36
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V37"
                >
                  V37
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V38"
                >
                  V38
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V39"
                >
                  V39
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V40"
                >
                  V40
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V41"
                >
                  V41
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V42"
                >
                  V42
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V43"
                >
                  V43
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V44"
                >
                  V44
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V45"
                >
                  V45
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V46"
                >
                  V46
                </SelectItem>
                <SelectItem value="V47">V47</SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V48"
                >
                  V48
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V49"
                >
                  V49
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V50"
                >
                  V50
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V51"
                >
                  V51
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V52"
                >
                  V52
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V53"
                >
                  V53
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V54"
                >
                  V54
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V55"
                >
                  V55
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V56"
                >
                  V56
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V57"
                >
                  V57
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V58"
                >
                  V58
                </SelectItem>
                <SelectItem
                  className="focus:bg-chingu-green-500 focus:text-chingu-green-100"
                  value="V59"
                >
                  V59
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="voyageTier" className="text-white">
              Voyage Tier
            </Label>
            <ToggleGroup
              type="single"
              value={filterState.voyageTier}
              spacing={1}
              className="w-full justify-between"
              onValueChange={(value) => {
                setFilterState((prev) => ({
                  ...prev,
                  voyageTier: value,
                }));
              }}
            >
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="all"
              >
                All
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="tier 1"
              >
                Tier 1
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="tier 2"
              >
                Tier 2
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="tier 3"
              >
                Tier 3
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="gender" className="text-white">
              Gender
            </Label>
            <ToggleGroup
              type="single"
              value={filterState.gender}
              spacing={1}
              className="w-full justify-between"
              onValueChange={(value) => {
                setFilterState((prev) => ({
                  ...prev,
                  gender: value,
                }));
              }}
            >
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="all"
              >
                All
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="male"
              >
                Male
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="female"
              >
                Female
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-chingu-green-300 bg-chingu-green-400 data-[state=on]:bg-chingu-green-100 data-[state=on]:text-chingu-green-600 hover:bg-chingu-green-500 hover:text-chingu-green-100"
                value="other"
              >
                Other
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <DialogFooter className="flex flex-row sm:justify-evenly">
          <Button
            className="flex-1 rounded-full bg-chingu-blue-100 text-black hover:bg-ching-blue-100 hover:text-black"
            onClick={handleFilterReset}
          >
            Clear Filters
          </Button>
          <DialogClose asChild>
            <Button
              type="submit"
              className="flex-1 rounded-full bg-chingu-green-100 text-black hover:bg-chingu-green-100 hover:text-black"
              onClick={handleFilterSubmit}
            >
              Filter Now
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
