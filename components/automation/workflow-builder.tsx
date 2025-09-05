"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Settings } from "lucide-react"
import type { PaymentWorkflow, WorkflowCondition, WorkflowAction } from "@/lib/automation/payment-automation"

interface WorkflowBuilderProps {
  onSave: (workflow: Omit<PaymentWorkflow, "id" | "successCount" | "failureCount">) => void
  initialWorkflow?: PaymentWorkflow
}

export function WorkflowBuilder({ onSave, initialWorkflow }: WorkflowBuilderProps) {
  const [workflow, setWorkflow] = useState<Partial<PaymentWorkflow>>({
    name: initialWorkflow?.name || "",
    type: initialWorkflow?.type || "conditional",
    status: initialWorkflow?.status || "active",
    conditions: initialWorkflow?.conditions || [],
    actions: initialWorkflow?.actions || [],
    schedule: initialWorkflow?.schedule || "",
  })

  const addCondition = () => {
    const newCondition: WorkflowCondition = {
      type: "amount",
      operator: "greater_than",
      value: 0,
    }
    setWorkflow((prev) => ({
      ...prev,
      conditions: [...(prev.conditions || []), newCondition],
    }))
  }

  const updateCondition = (index: number, field: keyof WorkflowCondition, value: any) => {
    setWorkflow((prev) => ({
      ...prev,
      conditions: prev.conditions?.map((condition, i) => (i === index ? { ...condition, [field]: value } : condition)),
    }))
  }

  const removeCondition = (index: number) => {
    setWorkflow((prev) => ({
      ...prev,
      conditions: prev.conditions?.filter((_, i) => i !== index),
    }))
  }

  const addAction = () => {
    const newAction: WorkflowAction = {
      type: "send_payment",
      parameters: {},
    }
    setWorkflow((prev) => ({
      ...prev,
      actions: [...(prev.actions || []), newAction],
    }))
  }

  const updateAction = (index: number, field: keyof WorkflowAction, value: any) => {
    setWorkflow((prev) => ({
      ...prev,
      actions: prev.actions?.map((action, i) => (i === index ? { ...action, [field]: value } : action)),
    }))
  }

  const removeAction = (index: number) => {
    setWorkflow((prev) => ({
      ...prev,
      actions: prev.actions?.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    if (workflow.name && workflow.conditions && workflow.actions) {
      onSave(workflow as Omit<PaymentWorkflow, "id" | "successCount" | "failureCount">)
    }
  }

  return (
    <div className="space-y-6">
      {/* Workflow Basic Info */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Workflow Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">
                Workflow Name
              </Label>
              <Input
                id="name"
                value={workflow.name}
                onChange={(e) => setWorkflow((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-slate-300">
                Workflow Type
              </Label>
              <Select
                value={workflow.type}
                onValueChange={(value) => setWorkflow((prev) => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="conditional">Conditional</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="trigger-based">Trigger-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {workflow.type === "scheduled" && (
            <div>
              <Label htmlFor="schedule" className="text-slate-300">
                Schedule
              </Label>
              <Select
                value={workflow.schedule}
                onValueChange={(value) => setWorkflow((prev) => ({ ...prev, schedule: value }))}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border-emerald-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-emerald-400 flex items-center justify-between">
            Conditions
            <Button onClick={addCondition} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-1" />
              Add Condition
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {workflow.conditions?.map((condition, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
            >
              <Select value={condition.type} onValueChange={(value) => updateCondition(index, "type", value)}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="currency">Currency</SelectItem>
                  <SelectItem value="user_type">User Type</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                  <SelectItem value="balance">Balance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={condition.operator} onValueChange={(value) => updateCondition(index, "operator", value)}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                </SelectContent>
              </Select>

              <Input
                value={condition.value}
                onChange={(e) => updateCondition(index, "value", e.target.value)}
                className="flex-1 bg-slate-800/50 border-slate-600 text-white"
                placeholder="Value"
              />

              <Button
                onClick={() => removeCondition(index)}
                size="sm"
                variant="destructive"
                className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center justify-between">
            Actions
            <Button onClick={addAction} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              Add Action
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {workflow.actions?.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
            >
              <Select value={action.type} onValueChange={(value) => updateAction(index, "type", value)}>
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="send_payment">Send Payment</SelectItem>
                  <SelectItem value="mint_tokens">Mint Tokens</SelectItem>
                  <SelectItem value="send_notification">Send Notification</SelectItem>
                  <SelectItem value="update_balance">Update Balance</SelectItem>
                  <SelectItem value="execute_contract">Execute Contract</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 text-sm text-slate-400">Parameters: {JSON.stringify(action.parameters)}</div>

              <Button
                onClick={() => removeAction(index)}
                size="sm"
                variant="destructive"
                className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8"
        >
          Save Workflow
        </Button>
      </div>
    </div>
  )
}
