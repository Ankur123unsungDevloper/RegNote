/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { BiExport } from "react-icons/bi";

import jsPDF from 'jspdf';


export const Export = () => {

  const handleExport = () => {
    const pdfDoc = new jsPDF();
    
    pdfDoc.save("Document.pdf");
  };

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()} className="flex flex-row items-center w-full">
        <BiExport className="h-5 w-5 mr-2" />
        Export
      </DialogTrigger>
      <DialogContent className="flex w-[26rem] bg-neutral-800">
        <DialogHeader>
          <DialogDescription className="flex flex-col items-center">
            <div className="flex flex-row items-center space-x-10">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Export Format
                </p>
              </div>
              <div className="">
                <Select>
                  <SelectTrigger className="w-22 hover:bg-neutral-700/50">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf" className="flex ">PDF</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* <div className="flex flex-row items-center space-x-10">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Include databases
                </p>
              </div>
              <div className="">
                <Select>
                  <SelectTrigger className="w-22 hover:bg-neutral-700/50">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xyz">Xyz</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-10">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Include content
                </p>
              </div>
              <div className="">
                <Select>
                  <SelectTrigger className="w-22 hover:bg-neutral-700/50">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xyz">Xyz</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-10">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Page format
                </p>
              </div>
              <div className="">
                <Input />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-10">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Scale percent
                </p>
              </div>
              <div className="">
                <Select>
                  <SelectTrigger className="w-22 hover:bg-neutral-700/50">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xyz">Xyz</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                    <SelectItem value="xyz">Xyz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-20">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Include subpages
                </p>
              </div>
              <div className="">
                <Switch />
              </div>
            </div>
            <div className="flex flex-row items-center space-x-20 mt-2">
              <div className="w-64">
                <p className="text-sm text-muted-foreground">
                  Create folders for subpages
                </p>
              </div>
              <div className="">
                <Switch />
              </div>
            </div>
            <div className="flex items-center justify-end ml-[18rem] mt-4">
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400"
                onClick={handleExport}
                size="sm"
              >
                Export
              </Button>
            </div> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
